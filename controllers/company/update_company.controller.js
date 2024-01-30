import Company from "../../models/company.model.js";
import { message } from "../../configs/message.js";

const UpdateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const updateData = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        res.json({
            success: true,
            message: message.companyMiseAJour,
            data: updatedCompany,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export { UpdateCompany };
