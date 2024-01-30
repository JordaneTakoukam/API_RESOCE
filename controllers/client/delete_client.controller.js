import { message } from "../../configs/message.js";
import Client from "../../models/client.model.js";


// Fonction pour supprimer un client
const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const deletedClient = await Client.findByIdAndDelete(clientId);

        if (!deletedClient) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        res.json({
            success: true,
            message: message.clientSupprime,
            data: deletedClient,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export { deleteClient };
