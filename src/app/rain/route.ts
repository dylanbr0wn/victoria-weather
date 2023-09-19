import { NextResponse } from "next/server";
import { getRainData } from "../../utils/rainData";

export async function GET() {
	const rain = await getRainData();

	return NextResponse.json({ rain });
}
