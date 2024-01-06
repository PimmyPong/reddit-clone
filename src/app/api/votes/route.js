import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
	const { postId } = response.params;
	try {
		// Attempt to find the vote
		const vote = await prisma.vote.findFirst({
			where: {
				id: postId,
			},
		});

		// If the vote exists, update it
		if (vote) {
			await prisma.vote.update({
				where: {
					id: postId,
				},
				data: {
					isUpvote: true,
				},
			});
		} else {
			// Handle the case where the vote doesn't exist
			return NextResponse.json({ success: false, error: "Vote not found" });
		}

		const user = fetchUser();
		if (!user.id) {
			return NextResponse.json({
				success: false,
				error: "Please log in to vote!",
			});
		}

		// Fetch the updated vote
		const updatedVote = await prisma.vote.findFirst({
			where: {
				id: postId,
			},
		});

		return NextResponse.json({ success: true, vote: updatedVote });
	} catch (error) {
		console.error("Error updating vote:", error);
		return NextResponse.json({
			success: false,
			error: "Failed to update vote",
		});
	}
}
