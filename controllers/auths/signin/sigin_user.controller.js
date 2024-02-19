import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from './../../../models/user.model.js';
import { message } from './../../../configs/message.js';
import { DateTime } from "luxon";

const signInUser = async (req, res) => {
    const { loginId, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données
        const loginUser = await User.findOne({ loginId });

        if (!loginUser) {
            return res.status(404).json({
                success: false,
                message: message.userNonTrouver,
            });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, loginUser.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: message.motDePasseIncorrect,
            });
        }

        const currentDate = DateTime.now();

        // Mise à jour de l'historique de connexion
        loginUser.loginHistory.unshift(currentDate);
        await loginUser.save();

        // Génération du token JWT
        const token = jwt.sign(
            {
                cId: loginUser._id,
                lId: loginUser.loginId,
                r: loginUser.role,
            },
            process.env.SECRET_JWT_KEYS,
            { expiresIn: '24h' }
        );

        // Retourner les données de l'utilisateur sans le mot de passe
        const userData = { ...loginUser.toObject() };
        delete userData.password;

        res.json({
            success: true,
            message: message.connexionReussie,
            token,
            data: userData,
        });

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export default signInUser;
