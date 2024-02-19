import { message } from "../../configs/message.js";
import Client from "../../models/client.model.js";
import bcrypt from "bcrypt";
import { generateRandomClientId, generateRandomPassword } from '../../fonctions/fonctions.js';
import Company from "../../models/company.model.js";
import { keyCompanyState } from "../../configs/key_role.js";

const addClient = async (req, res) => {
    try {
        // Récupérer les données envoyées dans la requête
        const { email, profile, companyId, role, fonction, createdBy, gender } = req.body;


        // Vérifier si l'ID de la société existe déjà dans le tableau companies
        const existingCompany = await Company.findById(companyId);

        if (!existingCompany) {
            return res.status(400).json({
                success: false,
                message: message.companieNonTrouver,
            });
        }

        let loginId = generateRandomClientId();

        // Vérifier si le loginId existe déjà et le régénérer jusqu'à ce qu'il soit unique
        let existingClientWithLoginId = await Client.findOne({ loginId });

        while (existingClientWithLoginId) {
            loginId = generateRandomClientId();
            existingClientWithLoginId = await Client.findOne({ loginId });
        }

        const password = generateRandomPassword();
        console.log("Mot de passe = ", password);

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // // Obtenir la date actuelle
        const currentDate = new Date();


        // Créer une nouvelle instance de client
        const newClient = new Client({
            gender,
            email: email,
            loginId: loginId,
            password: hashedPassword,
            loginHistory: [],
            registrationDate: currentDate,
            profile: {
                username: profile.username,
                profilePicture: profile.profilePicture || '',
            },
            companyState: keyCompanyState.companyNotActivated,
            companyId,
            role: role,
            fonction: fonction,
            createdBy,
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

