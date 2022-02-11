import joi from "joi";

const cartSchema = joi.object(
    {
        productId: joi.string().required()
    }
);

export default cartSchema;