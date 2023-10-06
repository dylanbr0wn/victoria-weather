import { NextResponse } from "next/server";
import { getRainData } from "../../utils/rainData";

export const revalidate = 60;

export async function GET() {
	const rain = await getRainData();

	return NextResponse.json({ rain });
}
