import Company from "../../models/company.model.js";
import CompanyNotActivated from "../../models/companies-not-activated.model.js";
import { message } from "../../configs/message.js";

export const GetAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        res.json({
            success: true,
            data: companies
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export const GetAllCompaniesNotActivated = async (req, res) => {
    try {
        const companies = await CompanyNotActivated.find();

        res.json({
            success: true,
            data: companies
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};


// GET COMPANY BY ID
export const GetCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: message.companyNonTrouve
            });
        }

        res.json({
            success: true,
            data: company
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};
