import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Client from './../../../models/client.model.js';
import { message } from './../../../configs/message.js';
import { DateTime } from "luxon";

const signClient = async (req, res) => {
    const { loginId, password } = req.body;

    try {
        // Recherche du client dans la base de données
        const client = await Client.findOne({ loginId });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, client.profile.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: message.motDePasseIncorrect,
            });
        }

        // Mise à jour de l'historique de connexion
        const currentDate = DateTime.now();
        client.loginHistory.unshift(currentDate);
        const signinClient = await client.save();

        // Génération du token JWT
        const token = jwt.sign(
            {
                cId: client._id,
                lId: client.loginId,
                r: client.role,
            },
            process.env.SECRET_JWT_KEYS,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: message.connexionReussie,
            token,
            data: signinClient,
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
