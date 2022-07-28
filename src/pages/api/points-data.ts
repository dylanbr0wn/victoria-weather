import { Db } from "mongodb";
import { NextApiHandler } from "next";
import clientPromise from "../../utils/mongo.js";

const Handler: NextApiHandler = async (_req, res) => {
	const client = await clientPromise;
	const db = client.db("victoria-weather");
	const [points] = await Promise.all([getPoints(db)]);
	res.json({ points });
};

const getPoints = async (db: Db) => {
	const collection = db.collection("points-data");

	const data = await collection.findOne({});
	return data;
};
export default Handler;
