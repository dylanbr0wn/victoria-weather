
import clientPromise from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    const client = await clientPromise;
    const db = client.db("victoria-weather");
    const [points] = await Promise.all([

        getPoints(db)
    ])
    res.json({ points });
}

const getPoints = async (db) => {
    const collection = db.collection("points-data");

    const data = await collection.findOne({});
    return data;
}