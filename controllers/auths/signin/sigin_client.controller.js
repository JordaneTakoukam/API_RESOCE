import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Client from './../../../models/client.model.js';
import { message } from './../../../configs/message.js';

const signClient = async (req, res) => {
    const { loginId, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await Client.findOne({ loginId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: message.userNonTrouver,
            });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: message.motDePasseIncorrect,
            });
        }

        // Génération du token JWT
        const token = jwt.sign(
            {
                cId: user._id,
                lId: user.loginId,
                r: user.role,
            },
            process.env.SECRET_JWT_KEYS,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: message.connexionReussie,
            token,
        });

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export default signClient;
