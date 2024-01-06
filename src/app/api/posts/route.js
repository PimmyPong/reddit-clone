import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
	try {
		const { title, message, subredditId, parentId } = await request.json();

		if (!subredditId) {
			return NextResponse.json({
				success: false,
				error: "Please choose community to post",
			});
		}

		if (!message) {
			return NextResponse.json({
				success: false,
				error: "Please provide a message",
			});
		}

		const user = await fetchUser();
		if (!user.id) {
			return NextResponse.json({
				success: false,
				error: "Please log in to post",
			});
		}

		const post = await prisma.post.create({
			data: {
				title,
				message,
				subredditId,
				parentId,
				userId: user.id,
			},
		});
		return NextResponse.json({ success: true, post });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}
