import express from "express";

// validator yup
import { validateSignIn, validateSignUpUser, validateChangePassword } from "./../validators/auth.validator.js";


// controllers
import signUpUser from "./../controllers/auths/signup/signup_user.controller.js";
import signInUser from "./../controllers/auths/signin/sigin_user.controller.js";
import signInClient from "./../controllers/auths/signin/sigin_client.controller.js";
import changePasswordUser from "../controllers/auths/password/change_password_user.controller.js";
import changePasswordClient from "../controllers/auths/password/change_password_client.controller.js";

// middleware
import { isAdminOrPersonAuthorized } from "../middlewares/client_user_middleware.js";
import { validateHeaderRequestParams } from "../validators/headerRequest.js";

const router = express.Router();


// signup
router.post("/signup/user", validateSignUpUser, signUpUser);

// signin
router.post("/signin/user", validateSignIn, signInUser); // pas besoin d'authorisation
router.post("/signin/client", validateSignIn, signInClient); // pas besoin d'authorisation

// changer de mot de passe
// userId et clientId
router.put("/password/change/user/:id", validateHeaderRequestParams, isAdminOrPersonAuthorized, validateChangePassword, changePasswordUser); //uniquement le concerner/super-admin/admin
router.put("/password/change/client/:id", validateHeaderRequestParams, isAdminOrPersonAuthorized, validateChangePassword, changePasswordClient); //uniquement le concerner/super-admin/admin



export default router;
