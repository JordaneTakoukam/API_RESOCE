import express from "express";


//  validator yup
import { validateCreateClient } from "../validators/client.validator.js";

// middleware
import { isAdminOrModerator } from "../middlewares/user_middleware.js";


// controllers
import { addClient } from "../controllers/client/add_client.controller.js";



const router = express.Router();


// auths
router.post("/add", isAdminOrModerator, validateCreateClient, addClient);




export default router;
