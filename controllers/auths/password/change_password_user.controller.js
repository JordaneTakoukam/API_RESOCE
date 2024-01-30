import bcrypt from "bcrypt";
import Client from './../../../models/client.model.js';
import { message } from './../../../configs/message.js';

const changePasswordClient = async (req, res) => {
    const { loginId, newPassword } = req.body;

    try {
        // Recherche du client dans la base de données
        const client = await Client.findOne({ loginId });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        // Génération du nouveau hash de mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mise à jour du mot de passe dans le profil du client
        client.profile.password = hashedPassword;

        // Enregistrement des modifications
        const updatedClient = await client.save();

        res.json({
            success: true,
            message: message.motDePasseReinitialise,
            data: updatedClient,
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
