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

export { getClient, getAllClients }