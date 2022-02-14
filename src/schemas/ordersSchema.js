import joi from 'joi';

const ordersSchema = joi.object(
    {
        name: joi.string().required(),
        adress: joi.string().required(),
        complement: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        postalCode: joi.string().required(),
        phone: joi.string().required(),
        cardNumber: joi.string().required(),
        cardName: joi.string().required(),
        expiringDate: joi.string().required(),
        CVV: joi.string().required()
    }
);

export default ordersSchema;