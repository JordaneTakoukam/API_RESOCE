import yup from "yup";


async function validateCreateCompany(req, res, next) {
    try {
        const schema = yup.object().shape({
            companyName: yup.string().required(),
            properties: yup.object().shape({
                name: yup.string().required(),
                phoneNumber: yup.string().required(),
                email: yup.string().email().required(),
            }),
            location: yup.string(),
            createBy: yup.string().required(),
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
