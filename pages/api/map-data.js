
import { client } from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    console.log("fetching")
    await client.connect();
    const db = client.db("victoria-weather");
    const [intersection, island, points] = await Promise.all([
        getIntersection(db),
        getIsland(db)
    ])
    console.log("all fetched")
    res.json({ intersection, island, points });
}

const getIsoBands = () => {

}

const getIntersection = async (db) => {
    console.log("fetching intersection")
    const collection = db.collection("intersection");
    const data = await collection.findOne({});
    console.log("fetched intersection")
    return data
}

const getIsland = async (db) => {
    console.log("fetching island")
    const collection = db.collection("island");
    const data = await collection.findOne({});
    console.log("fetched island")
    return data;
}