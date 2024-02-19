import yup from "yup";


async function validateCreateClient(req, res, next) {
    try {
        const schema = yup.object().shape({
            profile: yup.object().shape({
                username: yup.string().required(),
                email: yup.string().email().required(),
            }).required(),
            companyInfos: yup.array().of(yup.object().shape({
                companyId: yup.string().required(),
                role: yup.string().required(),
                fonction: yup.string().default('member'),
                createdBy: yup.object().shape({
                    type: yup.string().required(),
                    role: yup.string().required(),
                    id: yup.mixed().required(),
                }).required()
            })).required(),
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





async function validateCreateClientOwner(req, res, next) {
    try {
        const schema = yup.object().shape({
            profile: yup.object().shape({
                username: yup.string().required(),
                email: yup.string().email().required(),
            }).required(),
            companyInfos: yup.array().of(yup.object().shape({
                companyId: yup.string().required(),
                fonction: yup.string().default('member'),
                createdBy: yup.object().shape({
                    type: yup.string().required(),
                    role: yup.string().required(),
                    id: yup.mixed().required(),
                }).required(),
            
            })).required(),
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




export { validateCreateClient, validateCreateClientOwner };
