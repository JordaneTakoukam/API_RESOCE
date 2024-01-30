import yup from "yup";

async function validateSignIn(req, res, next) {
    try {
        const schema = yup.object().shape({
            loginId: yup.string().required(),
            password: yup.string().required(),
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


async function validateSignUpUser(req, res, next) {
    try {
        const schema = yup.object().shape({
            role: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
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
export { validateSignIn, validateSignUpUser };