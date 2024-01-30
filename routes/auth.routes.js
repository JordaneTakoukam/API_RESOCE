import express from "express";

// validator yup
import { validateSignIn, validateSignUpUser } from "./../validators/auth.validator.js";


// controllers
import signUpUser from "./../controllers/auths/signup/signup_user.controller.js";
import signInUser from "./../controllers/auths/signin/sigin_user.controller.js";
import signInClient from "./../controllers/auths/signin/sigin_client.controller.js";

const router = express.Router();


// auths
router.post("/signup/user", validateSignUpUser, signUpUser);
router.post("/signin/user", validateSignIn, signInUser);
router.post("/signin/client", validateSignIn, signInClient);



export default router;
