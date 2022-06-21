
import { client } from "../../utils/mongo.js";

export default async function Handler(req, res) {
    await client.connect();
    const db = client.db("victoria-weather");
    const collection = db.collection("map-data");
    const data = await collection.findOne({});

    res.json(data);
}