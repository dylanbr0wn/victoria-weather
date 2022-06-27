
import { client } from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    await client.connect();
    const db = client.db("victoria-weather");
    const [intersection, island, points] = await Promise.all([
        getIntersection(db),
        getIsland(db)
    ])
    await client.close();
    res.json({ intersection, island, points });
}

const getIsoBands = () => {

}

const getIntersection = async (db) => {
    const collection = db.collection("intersection");
    const data = await collection.findOne({});
    return data
}

const getIsland = async (db) => {
    const collection = db.collection("island");
    const data = await collection.findOne({});
    return data;
}