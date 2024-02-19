import bcrypt from "bcrypt";
import User from '../../../../models/user.model.js';
import { message } from '../../../../configs/message.js';

const changePasswordUser = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.params.id;

    try {
        // Recherche de l'utilisateur dans la base de données par son ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: message.userNonTrouver,
            });
        }

        // Vérification de l'ancien mot de passe
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: message.motDePasseIncorrect,
            });
        }

        // Génération du nouveau hash de mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mise à jour du mot de passe dans le profil de l'utilisateur
        user.password = hashedPassword;

        // Enregistrement des modifications
        await user.save();

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

export default changePasswordUser;
