import db from "../db.js";

export async function postOrder(req, res) {
    try {
        const userInfo = req.body;
        const { user } = res.locals;
        const userCart = await db.collection("cart").findOne({ id_user: user._id });
        await db.collection("orders").insertOne({ id_user: user._id, ...userInfo, cart: userCart.cart });

        await db.collection("cart").deleteOne({ id_user: user._id });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}