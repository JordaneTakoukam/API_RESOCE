import { message } from "../../configs/message.js";
import Statics from "../../models/static.model.js";  // Assurez-vous que le chemin est correct

export const AddCountries = async (req, res) => {
    try {
        const { countries } = req.body;

        if (!countries || !Array.isArray(countries)) {
            return res.status(400).json({
                success: false,
                message: message.invalidInput // Utilisation d'un message générique pour une entrée invalide
            });
        }

        // Vérifier si les pays existent déjà dans la base de données
        const existingStatics = await Statics.findOne();
        if (existingStatics) {
            const existingCountries = existingStatics.countries.map(country => country.code);
            for (let country of countries) {
                if (existingCountries.includes(country.code)) {
                    return res.status(400).json({
                        success: false,
                        message: message.countriesAddedSuccessfully
                    });
                }
            }
        }

        // Ajouter les pays à la base de données
        const statics = existingStatics || new Statics();
        statics.countries.push(...countries);
        await statics.save();

        res.json({
            success: true,
            message: message.countriesAddedSuccessfully,
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};


export const GetCountries = async (req, res) => {
    try {
        const statics = await Statics.findOne();

        if (!statics) {
            return res.status(404).json({
                success: false,
                message: message.notCountryFound,
            });
        }

        const countries = statics.countries || [];

        res.json({
            success: true,
            data: countries
        });
    } catch (e) {
        console.error("Erreur :", e);
        res.status(500).json({
            success: false,
            message: message.erreurServeur
        });
    }
};