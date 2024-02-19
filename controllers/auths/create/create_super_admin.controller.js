import bcrypt from "bcrypt";
import { DateTime } from "luxon";
import jwt from 'jsonwebtoken';
import User from './../../../models/user.model.js';
import { message } from './../../../configs/message.js';
import { keyRoleApp } from './../../../configs/key_role.js'
import { generateRandomPassword, generateRandomUserId } from "../../../fonctions/fonctions.js";


export const createSuperAdmin = async (req, res) => {
    const { username, email } = req.body;

    try {
        // Vérifier s'il existe un compte super-admin
        const existingSuperAdmin = await User.findOne({ role: keyRoleApp.superAdmin });

        if (existingSuperAdmin) {
            return res.status(400).json({
                success: false,
                message: message.superAdminDejaExistant,
            });
        }

        // Vérifier si l'utilisateur existe déjà avec cet e-mail
        const existingUserWithEmail = await User.findOne({ email });

        if (existingUserWithEmail) {
            return res.status(400).json({
                success: false,
                message: message.emailExiste,
            });
        }


        // Générer un identifiant de connexion unique
        let loginId = generateRandomUserId();
        let existingUserWithLoginId = await User.findOne({ loginId });

        // Vérifier si le loginId existe déjà et le régénérer jusqu'à ce qu'il soit unique
        while (existingUserWithLoginId) {
            loginId = generateRandomUserId();
            existingUserWithLoginId = await User.findOne({ loginId });
        }

        let passwordGenerate = generateRandomPassword();
        console.log('Mot de passe = ', passwordGenerate);

        let role = keyRoleApp.superAdmin;

        // Hash du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordGenerate, saltRounds);
        const currentDate = DateTime.now();

        // Créer un nouvel utilisateur
        const newUser = new User({
            loginId,
            email,
            username,
            role,
            password: hashedPassword,
            registrationDate: currentDate,
            loginHistory: []
        });

        const user = await newUser.save();

        // Générer un jeton JWT
        const token = jwt.sign(
            {
                cId: user._id,
                lId: user.loginId,
                r: user.role,
            },
            process.env.SECRET_JWT_KEYS,
            { expiresIn: '7d' }
        );


        // on retourne tous sauf le password
        const userData = user.toObject();
        delete userData.password;

        res.json({
            success: true,
            message: message.inscriptReuissie,
            token,
            data: userData,
        });

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};
