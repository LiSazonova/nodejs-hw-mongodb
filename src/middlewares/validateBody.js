export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (err) {
        const validationErrors = err.details.map(detail => detail.message);
        res.status(400).json({
            status: 400,
            message: "Validation Error",
            errors: validationErrors
        });
    }
};