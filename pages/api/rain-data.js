
import { client } from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    await client.connect();
    const db = client.db("victoria-weather");
    const [rain] = await Promise.all([

        getRainData(db)
    ])
    await client.close();
    res.json({ rain });
}

const getIsoBands = () => {

}

const getRainData = async (db) => {
    const collection = db.collection("rain-stats");
    const data = await collection.findOne({});
    return data
}
