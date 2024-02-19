import express from "express";


//  validator yup
import { validateCreateCompany } from "../validators/company.validator.js";

// middleware
import { isAdmin, isAdminOrModerator, isSuperAdmin, justVerifiyHeaderTokenAuthorization } from "../middlewares/user_middleware.js";


// controllers
import { CreateCompany } from "../controllers/company/create_company.controller.js";
import { GetAllCompanies, GetAllCompaniesNotActivated, GetCompanyById } from "../controllers/company/get_company.controller.js";
import { DeleteCompanyById } from "../controllers/company/delete_company.controller.js";
import { isValidClient } from "../middlewares/client_middleware.js";
import { activatedCompany } from "../controllers/company/activated_company.controller.js";

const router = express.Router();


router.get("/activated/get-all", GetAllCompanies); // seulemt l'admin ou le moderateur
router.get("/not-activated/get-all", GetAllCompaniesNotActivated); // seulemt l'admin ou le moderateur

router.get("/get/:companyId", justVerifiyHeaderTokenAuthorization, isValidClient, GetCompanyById); // seuelement ceux avec des token valides
// je dois prevoir la possibilite de get une company non activer ! =========================

// auths
router.post(
    "/add", // route
    // isAdminOrModerator, // middleware d'autorization sur cette route
    // validateCreateCompany, // validateur yup pour le body de la requete
    CreateCompany, // fonction appeler sur cette route
);



router.put("/update/:companyId", justVerifiyHeaderTokenAuthorization, isValidClient, CreateCompany);
router.delete("/delete/:companyId", justVerifiyHeaderTokenAuthorization, isValidClient, DeleteCompanyById);


router.put("/activated", activatedCompany);


export default router;
