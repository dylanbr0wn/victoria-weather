import { NextResponse } from "next/server";
import clientPromise from "../../utils/mongo";
import { getPointsData } from "../../utils/pointsData";
import { PointsData } from "../../utils/types";

export async function GET() {
	const points = await getPointsData();
	console.log(points);
	return NextResponse.json({ points });
}
