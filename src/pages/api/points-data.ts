import { Db } from "mongodb";
import { NextApiHandler } from "next";
import clientPromise from "../../utils/mongo";

const Handler: NextApiHandler = async (_req, res) => {
	const client = await clientPromise;
	const db = client.db("weather-test");
	const points = await getPoints(db);
	res.json(points);
};

const getPoints = async (db: Db) => {
	const collection = db.collection("points-data");

	const data = await collection.findOne({});
	return data;
};
export default Handler;
