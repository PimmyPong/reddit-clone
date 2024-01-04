import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
	try {
		const user = await fetchUser();
		if (!user.id) {
			return NextResponse.json({
				success: false,
				error: "You must log in to create a community!",
			});
		}

		const { name } = await request.json();
		if (!name) {
			return NextResponse.json({
				success: false,
				error: "Please create your community",
			});
		}

		const subreddit = await prisma.subreddit.create({
			data: {
				name,
				userId: user.id,
			},
		});

		return NextResponse.json({ success: true, subreddit });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}
