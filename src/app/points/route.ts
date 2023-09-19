import { NextResponse } from "next/server";
import { getPointsData } from "../../utils/pointsData";

export async function GET() {
	const points = await getPointsData();
	return NextResponse.json({ points });
}
