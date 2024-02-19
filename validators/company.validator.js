import yup from "yup";

async function validateCreateCompany(req, res, next) {
    try {

        const schema = yup.object().shape({
            companyName: yup.string().required(),
            ceo: yup.object().shape({
                name: yup.string().required(),
                phoneNumbers: yup.array().of(yup.string().required()).required(), // Modifié pour accepter un tableau de strings
                email: yup.string().email().required(),
            }),
            location: yup.object().shape({
                country: yup.string(),
                city: yup.string(),
                district: yup.string(),
                otherDetails: yup.string()
            }),
            businessType: yup.object().shape({
                type: yup.string().oneOf(['physical', 'online']).required()
            }),
            createdBy: yup.mixed().required(),
            suspension: yup.object().shape({
                suspended: yup.boolean().default(false),
                reason: yup.string().default(''),
                duration: yup.string().default(''), // En heures
            })
        });


        const validatedData = await schema.validate(req.body);
        req.validatedData = validatedData;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}
export { validateCreateCompany };
