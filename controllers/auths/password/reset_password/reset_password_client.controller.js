import bcrypt from "bcrypt";
import Client from '../../../../models/client.model.js';
import { generateRandomPassword } from "./../../../../fonctions/fonctions.js";
import { sendEmail } from './../../../../utils/email.js'; // Importer la fonction sendEmail
import { message } from './../../../../configs/message.js';

export const resetAccountClient = async (req, res) => {
    const { loginId } = req.body;

    try {
        // Recherche du client dans la base de données
        const client = await Client.findOne({ loginId });

        if (!client) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        // Génération d'un nouveau mot de passe aléatoire
        const newPassword = generateRandomPassword();

        // Hachage du nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mise à jour du mot de passe dans le profil du client
        client.password = hashedPassword;

        // Enregistrement des modifications dans la base de données
        await client.save();

        // Envoi d'un e-mail au client avec le nouveau mot de passe
        const emailContent = `Bonjour ${client.profile.username},<br><br>Votre mot de passe a été réinitialisé avec succès. Votre nouveau mot de passe est : <strong>${newPassword}</strong>.<br><br>Cordialement,<br>L'équipe.`;
        await sendEmail(client.email, 'Réinitialisation de votre mot de passe', emailContent);

        res.json({
            success: true,
            message: message.emailEnvoye,
        });

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

