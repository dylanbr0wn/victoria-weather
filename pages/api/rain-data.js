
import { client } from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    console.log("fetching")
    await client.connect();
    const db = client.db("victoria-weather");
    const [rain] = await Promise.all([

        getRainData(db)
    ])
    console.log("all fetched")
    res.json({ rain });
}

const getIsoBands = () => {

}

const getRainData = async (db) => {
    console.log("fetching rain data")
    const collection = db.collection("rain-stats");
    const data = await collection.findOne({});
    console.log("fetched intersection")
    return data
}
