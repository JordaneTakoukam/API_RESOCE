import express from "express";

//  validator yup body
import { validateCreateClient, validateCreateClientOwner } from "../validators/client.validator.js";

//  validator yup url header
import { validateHeaderRequestParams } from "../validators/headerRequest.js";

// middleware


// controllers
import { addClient } from "../controllers/client/add_client.controller.js";
import { getAllClients, getClient, getClientsByCompany } from "../controllers/client/get_client.controller.js";
import { updateClient } from "../controllers/client/update_client.controller.js";
import { deleteClient } from "../controllers/client/delete_client.controller.js";
import { addClientOwnerCompany } from "../controllers/client/add_owner_company.js";



const router = express.Router();


// client
router.get("/contacts-client/get", getClientsByCompany);

// uniquement le super-admin ou l'admin
router.get("/get-all", getAllClients);

// tous le monde ayant un role et le client en question
router.get("/get/:clientId", validateHeaderRequestParams, getClient);

//uniquement les users -> super-admin/admin/moderator
router.post("/add/owner", addClientOwnerCompany);

// uniquement le -> super-admin/admin/owner/manager
router.post("/add/employed", addClient);

// le super-admin, l'admin,  et le client en question
router.put("/update/:clientId", validateHeaderRequestParams, validateCreateClient, updateClient);

// le super-admin, l'admin, et le client en question
router.delete("/delete/:clientId", validateHeaderRequestParams, deleteClient);




export default router;
