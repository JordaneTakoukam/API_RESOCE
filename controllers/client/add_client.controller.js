import { DateTime } from "luxon";
import { message } from "../../configs/message.js";
import Client from "../../models/client.model.js";
import { generateRandomId, generateRandomPassword } from './../../fonctions/fonctions.js';

const addClient = async (req, res) => {
    try {
        // Récupérer les données envoyées dans la requête
        const { companyId, role, fonction, username, email } = req.body;


        const existingClientWithEmail = await Client.findOne({ email });
        if (existingClientWithEmail) {
            return res.status(400).json({
                success: false,
                message: message.emailExiste,
            });
        }


        const loginId = generateRandomId();
        const password = generateRandomPassword();

        const currentDate = DateTime.now();

        // Créer une nouvelle instance de l'entreprise
        const newClient = new Client({
            companyId,
            role,
            fonction,
            loginId,
            profile: {
                username,
                password,
                email
            },
            registrationDate: currentDate,
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

export { addClient };
