import { ObjectId } from "mongodb";
import db from "../db.js";

export async function postItemOnCart(req, res) {
    try {
        const productId = req.body.productId;

        // const { participant } = res.locals;
        const participant = { _id: "6205a26713e31475304e8059" }

        // pego o _id desse participante e procuro um cart com esse mesmo id_user
        const userCart = await db.collection('carts').findOne({ id_user: new ObjectId(participant._id) });
        // userCart.cart é a lista com as coisas que tem no carrinho
        // tenho que verificar se já existe no carrinho alguem com esse productId
        let alreadyOnCart = false;
        for (let i = 0; i < userCart.cart.length; i++) {
            if (userCart.cart[i].productId === productId) {
                alreadyOnCart = true;
            }
        }
        // se não tiver (!alreadyOnCart) no carrinho
        // adicionar no carrinho com quantity: 1 { _id: new ObjectId(), productId, quantity: 1 }
        // senão (já está no carrinho) aumentar a quantidade 
        if (!alreadyOnCart) {
            await db.collection('carts').updateOne({
                id_user: new ObjectId(participant._id)
            }, {
                $push: { cart: { _id: new ObjectId(), productId, quantity: 1 } }
            });
        } else {
            await db.collection('carts').updateOne({
                id_user: new ObjectId(participant._id),
                "cart.productId": productId
            }, {
                $inc: { "cart.$.quantity": 1 }
            });
        }
        const updatedCart = await db.collection('carts').findOne({ id_user: new ObjectId(participant._id) });

        res.status(201).send(updatedCart);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}