import { ObjectId } from "mongodb";
import db from "../db.js";

export async function postItemOnCart(req, res) {
  try {
    const productId = req.body.productId;

    const { user } = res.locals;
    let userCart = await db
      .collection("cart")
      .findOne({ id_user: new ObjectId(user._id) });
    if (!userCart) {
      await db.collection("cart").insertOne({ id_user: user._id, cart: [] });
      userCart = await db
        .collection("cart")
        .findOne({ id_user: new ObjectId(user._id) });
    }
    let alreadyOnCart = false;
    for (let i = 0; i < userCart.cart.length; i++) {
      if (userCart.cart[i].productId === productId) {
        alreadyOnCart = true;
      }
    }

    if (!alreadyOnCart) {
      await db.collection("cart").updateOne(
        {
          id_user: new ObjectId(user._id),
        },
        {
          $push: { cart: { _id: new ObjectId(), productId, quantity: 1 } },
        }
      );
    } else {
      await db.collection("cart").updateOne(
        {
          id_user: new ObjectId(user._id),
          "cart.productId": productId,
        },
        {
          $inc: { "cart.$.quantity": 1 },
        }
      );
    }
    const updatedCart = await db
      .collection("cart")
      .findOne({ id_user: new ObjectId(user._id) });
    return res.status(201).send(updatedCart);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCart(req, res) {
  try {
    let productsInfo = [];
    const { user } = res.locals;
    const userCart = await db.collection("cart").findOne({ id_user: user._id });
    if (userCart?.cart) {
      for (let product of userCart.cart) {
        const info = await db
          .collection("products")
          .findOne({ _id: new ObjectId(product.productId) });
        const aux = info.price.replace(",", ".");
        productsInfo.push({
          productId: info._id,
          name: info.name,
          image: info.image,
          price: info.price,
          quantity: product.quantity,
          subtotal: (parseInt(product.quantity) * parseFloat(aux)).toFixed(2),
        });
      }
    }
    return res.status(200).send(productsInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteCollection(req, res) {
  const { collection } = req.body;
  await db.collection(collection).deleteMany({});
  res.sendStatus(200);
}

export async function updatedCart(req, res) {
  try {
    const { cart } = req.body;
    const { user } = res.locals;
    console.log(products);
    let carrinho = [{}];
    const userCart = await db.collection("cart").findOne({ id_user: user._id });
    if (userCart) {
      console.log("eu sou o carrinho atual ", userCart.cart);
      if (cart.quantity == 0 || cart.quantity == "0") {
        carrinho = userCart.cart.filter((product) => {
          if (product.productId !== new ObjectId(cart.productId))
            return product;
        });
      } else {
        carrinho = userCart.cart.map((product) => {
          if (product.productId == new ObjectId(cart.productId))
            return (product.quantity = cart.quantity);
        });
      }
      console.log("oi sou o cart ", carrinho);
      await db.collection("cart").updateOne(
        {
          _id: new ObjectId(user._id),
        },
        { $set: { cart: carrinho } }
      );
      return res.sendStatus(200);
    } else {
      return res.sendStatus(423).send({ message: "carrinho nao encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
