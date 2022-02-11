import db from "../db.js";
import { ObjectId } from "mongodb";

export default async function validateToken(req, res, next) {
  try {
    const { Authorization } = req.headers;
    const token = Authorization?.replace("Bearer ", "");
    console.log(token);
    if (!token) {
      return res.status(401).send({ message: "token vazio" });
    }

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).send({ message: "sessao nao encontrada" });
    }

    const participant = await db
      .collection("users")
      .findOne({ _id: session.userId });
    if (!participant) {
      console.log("deu ruim no usuario");
      return res.status(401).send({ message: "usuario nao encontrado" });
    }

    res.locals.user = participant;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
