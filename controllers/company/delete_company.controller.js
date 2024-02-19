import Company from "../../models/company.model.js";
import { message } from "../../configs/message.js";


// DELETE COMPANY BY ID
export const DeleteCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;
        const deletedCompany = await Company.findByIdAndDelete(companyId);

        if (!deletedCompany) {
            return res.status(404).json({
                success: false,
                message: message.companyNonTrouve
            });
        }

        res.json({
            success: true,
            message: message.companySupprime
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};