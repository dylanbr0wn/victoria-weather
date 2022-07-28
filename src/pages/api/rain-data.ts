import { Db } from "mongodb";
import { NextApiHandler } from "next";
import clientPromise from "../../utils/mongo.js";

const Handler: NextApiHandler = async (_req, res) => {
	const client = await clientPromise;
	const db = client.db("victoria-weather");
	const [rain] = await Promise.all([getRainData(db)]);
	res.json({ rain });
};

const getRainData = async (db: Db) => {
	const collection = db.collection("rain-stats");
	const data = await collection.findOne({});
	return data;
};

export default Handler;
