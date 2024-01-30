import bcrypt from "bcrypt";
import { DateTime } from "luxon";
import jwt from 'jsonwebtoken';
import User from './../../../models/user.model.js';
import { message } from './../../../configs/message.js';
import { generateRandomId } from './../../../fonctions/fonctions.js';

const signUpUser = async (req, res) => {
    const { email, firstName, lastName, role, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà avec cet e-mail
        const existingUserWithEmail = await User.findOne({ email });
        if (existingUserWithEmail) {
            return res.status(400).json({
                success: false,
                message: message.emailExiste,
            });
        }

        // Générer un identifiant de connexion unique
        let loginId = generateRandomId();
        let existingUserWithLoginId = await User.findOne({ loginId });

        // Vérifier si le loginId existe déjà et le régénérer jusqu'à ce qu'il soit unique
        while (existingUserWithLoginId) {
            loginId = generateRandomId();
            existingUserWithLoginId = await User.findOne({ loginId });
        }

        // Hash du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const currentDate = DateTime.now();

        // Créer un nouvel utilisateur
        const newUser = new User({
            loginId,
            email,
            firstName,
            lastName,
            role,
            password: hashedPassword,
            registrationDate: currentDate,
            loginHistory: [new Date(currentDate)]
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
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: message.inscriptReuissie,
            token,
            data: user,
        });

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};

export default signUpUser;
