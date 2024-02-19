
import { DateTime } from "luxon";
import { message } from "../../configs/message.js";
import CompaniesNotActivated from "../../models/companies-not-activated.model.js";
import Company from "../../models/company.model.js";
import Client from "../../models/client.model.js";
import { keyCompanyState } from "../../configs/key_role.js";
import { ObjectId } from "mongodb";


export const activatedCompany = async (req, res) => {
    try {
        // Récupérer les données envoyées dans la requête
        const { companyId } = req.body;

        // companyId est un ObjectId valide, vous pouvez continuer votre logique ici
        if (!ObjectId.isValid(companyId)) {
            // companyId n'est pas un ObjectId valide
            return res.status(400).json({
                success: false,
                message: message.mauvaisFormatDeLID,
            });
        }


        // Vérifier si l'entreprise existe déjà dans la collection 'companies'
        const existingCompany = await Company.findById(companyId);
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: message.entrepriseExisteDeja,
            });
        }

        // Récupérer les informations de l'entreprise à partir de 'companies-not-activated'
        const companyNotActivated = await CompaniesNotActivated.findById(companyId);
        if (!companyNotActivated) {
            return res.status(404).json({
                success: false,
                message: message.entrepriseExistePas,
            });
        }


        const activatedDate = DateTime.now();


        // Créer une nouvelle instance de l'entreprise à partir des données de 'companies-not-activated'
        const newCompany = new Company({
            activatedDate,
            companyName: companyNotActivated.companyName,
            creationDate: companyNotActivated.creationDate,
            ceo: companyNotActivated.ceo,
            location: companyNotActivated.location,
            companyType: companyNotActivated.companyType,
        });

        // Supprimer l'entreprise de la collection 'companies-not-activated'
        await CompaniesNotActivated.findByIdAndDelete(companyId);

        // Mettre à jour le client avec le rôle de propriétaire et le nouvel état de l'entreprise
        await Client.updateOne(
            { companyId: companyId, role: "owner" },
            {
                companyState: keyCompanyState.companyActivated,
                companyId: newCompany._id 
            }
        );

        // Sauvegarder l'entreprise dans la collection 'companies'
        const savedCompany = await newCompany.save();

        res.json({
            success: true,
            message: message.companyActiverSuccess,
            data: savedCompany,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
}

