import db from "../db.js";

export async function getProducts(req, res) {
  try {
    // await db.collection('products').deleteOne({ name: "Brownie com Nutella" });
    // await db.collection('products').insertOne({
    //   name: "Torta de Limão",
    //   image: "https://images.aws.nestle.recipes/resized/40b25559b85b265e885f55ec7c1e4d04_torta-lim%C3%A3o-receitas-nestle_1200_600.jpg",
    //   description: "Torta de limão com recheio cremoso de limão e leite condensado",
    //   price: "15,00"
    // });

    const products = await db.collection('products').find({}).toArray();

    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}