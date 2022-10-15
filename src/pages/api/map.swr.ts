import { Db } from "mongodb";
import clientPromise from "../../utils/mongo";

import { query } from "@next-fetch/swr";
import { MapData } from "../../utils/types";

export const useMapData = query(async () => {
	const client = await clientPromise;
	const db = client.db("weather-test");
	const [intersection, island] = await Promise.all([
		getIntersection(db),
		getIsland(db),
	]);
	return { intersection, island };
});

const getIntersection = async (db: Db) =>
	await db.collection<MapData["intersection"]>("intersection").findOne({});

const getIsland = async (db: Db) =>
	await db.collection<MapData["island"]>("island").findOne({});
