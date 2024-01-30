import { DateTime } from "luxon";
import { message } from "../../configs/message.js";
import Client from "../../models/client.model.js";
import { generateRandomId, generateRandomPassword } from '../../fonctions/fonctions.js';
import bcrypt from "bcrypt";


const addClientOwnerCompany = async (req, res) => {
    try {
        // Récupérer les données envoyées dans la requête
        const { companyId, fonction, username, email, createdby } = req.body;

        const role = "owner";

        // Vérifier si un client existe déjà avec cet e-mail
        const existingClientWithEmail = await Client.findOne({ 'profile.email': email });
        if (existingClientWithEmail) {
            return res.status(400).json({
                success: false,
                message: message.emailExiste,
            });
        }

        let loginId = generateRandomId();

        // Vérifier si le loginId existe déjà et le régénérer jusqu'à ce qu'il soit unique
        let existingClientWithLoginId = await Client.findOne({ loginId });
        while (existingClientWithLoginId) {
            loginId = generateRandomId();
            existingClientWithLoginId = await Client.findOne({ loginId });
        }

        const password = generateRandomPassword();
        console.log(password);

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Obtenir la date actuelle
        const currentDate = DateTime.now();

        // Créer une nouvelle instance de client
        const newClient = new Client({
            companyId,
            role,
            fonction,
            loginId,
            profile: {
                username,
                password: hashedPassword,
                email
            },
            registrationDate: currentDate,
            createdby
        });

        const client = await newClient.save();

        res.json({
            success: true,
            message: message.clientCreer,
            data: client,
        });

    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
}

export { addClientOwnerCompany };
