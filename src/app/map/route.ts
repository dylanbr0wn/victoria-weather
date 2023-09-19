import { NextResponse } from "next/server";
import { getMapData } from "../../utils/mapData";

export async function GET() {
	const { intersection, island } = await getMapData();

	return NextResponse.json({ intersection, island });
}
