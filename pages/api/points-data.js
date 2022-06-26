
import { client } from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    console.log("fetching")
    await client.connect();
    const db = client.db("victoria-weather");
    const [points] = await Promise.all([

        getPoints(db)
    ])
    console.log("all fetched")
    res.json({ points });
}

const getPoints = async (db) => {
    console.log("fetching points")
    const collection = db.collection("points-data");

    const data = await collection.findOne({});
    console.log("fetched points")
    return data;
}