import express from "express";

// validator yup
import { validateSignIn, validateSignUpUser, validateChangePassword } from "./../validators/auth.validator.js";


// controllers
import signUpUser from "./../controllers/auths/signup/signup_user.controller.js";
import signInUser from "./../controllers/auths/signin/sigin_user.controller.js";
import signInClient from "./../controllers/auths/signin/sigin_client.controller.js";
import changePasswordUser from "../controllers/auths/password/change_password_user.controller.js";
import changePasswordClient from "../controllers/auths/password/change_password_client.controller.js";

const router = express.Router();


// signup
router.post("/signup/user", validateSignUpUser, signUpUser);

// signin
router.post("/signin/user", validateSignIn, signInUser); // pas besoin d'authorisation
router.post("/signin/client", validateSignIn, signInClient); // pas besoin d'authorisation

// changer de mot de passe
router.put("/password/change/user", validateChangePassword, changePasswordUser); //uniquement le concerner/super-admin
router.put("/password/change/client", validateChangePassword, changePasswordClient); //uniquement le concerner/ admin



export default router;
