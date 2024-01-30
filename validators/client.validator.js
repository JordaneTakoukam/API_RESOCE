import yup from "yup";


async function validateCreateClient(req, res, next) {
    try {
        const schema = yup.object().shape({
            companyId: yup.string().required(),
            role: yup.string().required(),
            fonction: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().required(),
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
export { validateCreateClient };
