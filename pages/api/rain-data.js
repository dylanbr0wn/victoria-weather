import clientPromise from "../../utils/mongo.js";

export default async function Handler(_req, res) {
    const client = await clientPromise;
    const db = client.db("victoria-weather");
    const [rain] = await Promise.all([

        getRainData(db)
    ])
    res.json({ rain });
}

const getRainData = async (db) => {
    const collection = db.collection("rain-stats");
    const data = await collection.findOne({});
    return data
}
