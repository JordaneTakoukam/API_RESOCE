import bcrypt from "bcrypt";
import Client from './../../../models/client.model.js';
import { message } from './../../../configs/message.js';

const changePasswordClient = async (req, res) => {
    const { loginId, oldPassword, newPassword } = req.body;

    try {
        // Recherche du client dans la base de données
        const client = await Client.findOne({ loginId });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        // Vérification de l'ancien mot de passe
        const passwordMatch = await bcrypt.compare(oldPassword, client.profile.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: message.motDePasseIncorrect,
            });
        }

        // Génération du nouveau hash de mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mise à jour du mot de passe dans le profil du client
        client.profile.password = hashedPassword;

        // Enregistrement des modifications
        await client.save();

        res.json({
            success: true,
            message: message.motDePasseChange,
        });

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export default changePasswordClient;
