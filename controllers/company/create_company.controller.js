import { DateTime } from "luxon";
import { message } from "../../configs/message.js";
import CompaniesNotActivated from "../../models/companies-not-activated.model.js";
import { addClientOwnerCompany } from "../client/add_owner_company.js";

const CreateCompany = async (req, res) => {
    try {
        // Récupérer les données envoyées dans la requête
        const {
            companyType,
            companyName,
            ceo,
            location
        } = req.body;

        const { fullname, lastname, phoneNumbers, email } = ceo;
        const { country, city, district, otherDetails } = location;

        const creationDate = DateTime.now();

        // Créer une nouvelle instance de l'entreprise en attente
        const newCompany = new CompaniesNotActivated({
            companyName,
            ceo: {
                fullname,
                lastname,
                phoneNumbers,
                email
            },
            location: {
                country,
                city,
                district,
                otherDetails
            },
            companyType,
            creationDate
        });

        const companyPending = await newCompany.save();

        res.json({
            success: true,
            message: message.companyCreer,
            data: companyPending,
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
