import express from "express";


//  validator yup
import { validateCreateCompany } from "../validators/company.validator.js";

// middleware
import { isAdmin, isAdminOrModerator, isSuperAdmin } from "../middlewares/user_middleware.js";


// controllers
import { CreateCompany } from "../controllers/company/create_company.controller.js";

const router = express.Router();


router.get("/get-all", isAdminOrModerator, validateCreateCompany, CreateCompany);
router.get("/get/:id", isAdminOrModerator, validateCreateCompany, CreateCompany);


// auths
router.post(
    "/create", // route
    isAdminOrModerator, // middleware d'autorization sur cette route
    validateCreateCompany, // validateur yup pour le body de la requete
    CreateCompany, // fonction appeler sur cette route
);



router.put("/update", isAdminOrModerator, validateCreateCompany, CreateCompany);
router.delete("/delete", isAdminOrModerator, validateCreateCompany, CreateCompany);


export default router;
