import Company from "../../models/company.model.js";
import { DateTime } from "luxon";
import { message } from "../../configs/message.js";


const CreateCompany = async (req, res) => {
    try {
        // Récupérer les données envoyées dans la requête
        const { companyName, properties, location, createBy } = req.body;

        const currentDate = DateTime.now();



        // Créer une nouvelle instance de l'entreprise
        const newCompany = new Company({
            companyName: companyName,
            properties: properties,
            location: location,
            registrationDate: currentDate,
            createBy: createBy,
            suspended: false,
        });

        const company = await newCompany.save();

        res.json({
            success: true,
            message: message.companyCreer,
            data: company,
        });

    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
}

export { CreateCompany };
