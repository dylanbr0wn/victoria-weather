import { Db } from "mongodb";
import { NextApiHandler } from "next";
import clientPromise from "../../utils/mongo.js";

const Handler: NextApiHandler = async (_req, res) => {
	const client = await clientPromise;
	const db = client.db("victoria-weather");
	const [intersection, island] = await Promise.all([
		getIntersection(db),
		getIsland(db),
	]);
	res.json({ intersection, island });
};

const getIntersection = async (db: Db) => {
	const collection = db.collection("intersection");
	const data = await collection.findOne({});
	return data;
};

const getIsland = async (db: Db) => {
	const collection = db.collection("island");
	const data = await collection.findOne({});
	return data;
};

export default Handler;
