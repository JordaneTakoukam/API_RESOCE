import express from "express";

//  validator yup body
import { validateCreateClient, validateCreateClientOwner } from "../validators/client.validator.js";

//  validator yup url header
import { validateHeaderRequestParams } from "../validators/headerRequest.js";

// middleware
import { isAdmin, isAdminOrModerator } from "../middlewares/user_middleware.js";
import { isAdminOrOwnerOrManager } from "../middlewares/client_user_middleware.js";


// controllers
import { addClient } from "../controllers/client/add_client.controller.js";
import { getAllClients, getClient } from "../controllers/client/get_client.controller.js";
import { updateClient } from "../controllers/client/update_client.controller.js";
import { deleteClient } from "../controllers/client/delete_client.controller.js";
import { isClientAuthorized } from "../middlewares/client_middleware.js";
import { addClientOwnerCompany } from "../controllers/client/add_owner_company.js";



const router = express.Router();


// client

router.get("/get-all", isAdmin, validateCreateClient, getAllClients); // uniquement le super-admin ou l'admin
router.get("/get/:clientId", validateHeaderRequestParams, isClientAuthorized, validateCreateClient, getClient); // tous le monde ayant un role et le client en question

// ajouter un proprietaire d'entreprise
router.post("/add/owner", isAdminOrModerator, validateCreateClientOwner, addClientOwnerCompany); //uniquement les users -> super-admin/admin/moderator
router.post("/add/employed", isAdminOrOwnerOrManager, validateCreateClient, addClient); // uniquement le -> super-admin/admin/owner/manager


router.put("/update/:clientId", isAdminOrModerator, validateCreateClient, updateClient);  // le super-admin, l'admin,  et le client en question
router.delete("/delete/:clientId", isAdminOrModerator, validateCreateClient, deleteClient); // le super-admin, l'admin, et le client en question




export default router;
