import { message } from "../../configs/message.js";
import Client from "../../models/client.model.js";


// Fonction pour récupérer un client par son ID
const getClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        res.json({
            success: true,
            data: client,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

// Fonction pour récupérer tous les clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();

        res.json({
            success: true,
            data: clients,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};



const getClientsByCompany = async (req, res) => {
    try {
        // Récupérer les IDs de société à partir des paramètres de requête
        let companyIds = req.query.companyIds.split(",");


        

        // Vérifier si les IDs de société sont fournis
        if (!companyIds || companyIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Les IDs de la société sont requis."
            });
        }

        // Rechercher tous les clients appartenant aux sociétés spécifiées
        const clients = await Client.find({ companyId: { $in: companyIds } });

        res.json({
            success: true,
            data: clients,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: "Une erreur s'est produite lors du traitement de la requête."
        });
    }
};



export { getClient, getAllClients, getClientsByCompany }