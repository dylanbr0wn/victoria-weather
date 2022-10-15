import { query } from "@next-fetch/swr";
import { Db } from "mongodb";
import clientPromise from "../../utils/mongo";
import { RainData } from "../../utils/types";

export const useRainData = query(async () => {
	const client = await clientPromise;
	const db = client.db("weather-test");
	return await getRainData(db);
});

const getRainData = async (db: Db) =>
	await db.collection<RainData>("rain-stats").findOne({});
