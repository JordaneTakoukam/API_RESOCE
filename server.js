import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";


//
// connexion a mongodb online
import connectMongoDB from "./database/mongodb.connection.js";

//
// import des routes 
import defaultRoutes from "./routes/_default.route.js";
import authRoutes from "./routes/auth.routes.js";
import companyRoute from "./routes/company.routes.js";
import clientRoutes from "./routes/client.route.js";


//
// Crée une nouvelle instance de l'application Express
const app = express();

// Utilise le middleware express.json pour parser les corps de requête au format JSON avec une limite de 50 Mo
app.use(express.json({ limit: "50mb" }));

// Utilise le middleware CORS pour permettre les requêtes cross-origin
app.use(cors({}));

// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

// Configurer express-session pour gérer les sessions d'utilisateur
app.use(session({
    // Clé secrète utilisée pour signer les cookies de session
    secret: process.env.SECRET_SESSION_KEYS,
    // Indique à Express de ne pas sauvegarder automatiquement les sessions non modifiées
    resave: false,
    // Indique à Express de ne pas sauvegarder les sessions qui n'ont pas été initialisées
    saveUninitialized: false,
}));



//
// routes de l'api
app.use("/", defaultRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/company/", companyRoute);
app.use("/api/v1/client/", clientRoutes);



connectMongoDB(process.env.MONGODB_URL)
    .then(() => {
        app.listen(
            process.env.PORT || 8085,
            async () => {
                console.log(`🚀💥 Serveur en cours d\'exécution sur http://localhost:${process.env.PORT}`);
            });
    })
    .catch((error) => {
        console.log(error);
        process.exit(1); // Quitter le processus en cas d'echec
    });