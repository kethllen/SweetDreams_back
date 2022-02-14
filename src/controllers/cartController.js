import { ObjectId } from "mongodb";
import db from "../db.js";

export async function postItemOnCart(req, res) {
  try {
    const productId = req.body.productId;

    const { user } = res.locals;
    const userCart = await db
      .collection("cart")
      .findOne({ id_user: new ObjectId(user._id) });

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

    res.status(201).send(updatedCart);
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
    const products = req.body;
    const { user } = res.locals;
    let productsUpdate = products.filter((product) => {
      if (product.quantity !== 0 || product.quantity !== "0") return product;
    });
    await db.collection("cart").updateOne(
      {
        _id: new ObjectId(user._id),
      },
      { $set: productsUpdate }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
