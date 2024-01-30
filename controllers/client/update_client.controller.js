import { message } from "../../configs/message.js";
import Client from "../../models/client.model.js";


const updateClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const updates = req.body;

        const updatedClient = await Client.findByIdAndUpdate(clientId, updates, { new: true });

        if (!updatedClient) {
            return res.status(404).json({
                success: false,
                message: message.clientNonTrouve,
            });
        }

        res.json({
            success: true,
            message: message.clientMaj,
            data: updatedClient,
        });
    } catch (e) {
        console.error("Erreur : ", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};


export { updateClient };
