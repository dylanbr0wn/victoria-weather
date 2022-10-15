import { query } from "@next-fetch/swr";
import { Db } from "mongodb";
import clientPromise from "../../utils/mongo";
import { PointsData } from "../../utils/types";

export const usePointsData = query(async () => {
	const client = await clientPromise;
	const db = client.db("weather-test");
	return await getPoints(db);
});

const getPoints = async (db: Db) =>
	await db.collection<PointsData>("points-data").findOne({});
