import express from "express";

// validator yup
import { validateSignIn, validateChangePassword, validateCreateSuperAdmin, validateCreateAccountUser, validateChangePasswordUser } from "./../validators/auth.validator.js";


// controllers
import { createSuperAdmin } from "../controllers/auths/create/create_super_admin.controller.js";
import { createUser } from "../controllers/auths/create/create_user.controller.js";

import signInUser from "./../controllers/auths/signin/sigin_user.controller.js";
import signInClient from "./../controllers/auths/signin/sigin_client.controller.js";

// validator
import { validateHeaderRequestParams } from "../validators/headerRequest.js";
import changePasswordUser from "../controllers/auths/password/change_password/change_password_user.controller.js";
import changePasswordClient from "../controllers/auths/password/change_password/change_password_client.controller.js";
import { resetAccountClient } from "../controllers/auths/password/reset_password/reset_password_client.controller.js";

const router = express.Router();


// creer un compte super-admin
// router.post("/signup/user", validateSignUpUser, signUpUser);
router.post("/create/account/unique/super-admin", validateCreateSuperAdmin, createSuperAdmin);
router.post("/create/account/user", validateCreateAccountUser, createUser);

// signin
router.post("/signin/user", validateSignIn, signInUser); // pas besoin d'authorisation
router.post("/signin/client", validateSignIn, signInClient); // pas besoin d'authorisation

// changer de mot de passe
// userId et clientId
router.put("/password/change/user/:id", validateHeaderRequestParams, validateChangePasswordUser, changePasswordUser); //uniquement le concerner/super-admin/admin
router.put("/password/change/client/:id", validateHeaderRequestParams, validateChangePassword, changePasswordClient); //uniquement le concerner/super-admin/admin

router.put("/password/reset/client", resetAccountClient); //uniquement le concerner/super-admin/admin


export default router;
