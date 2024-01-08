import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
	try {
		const { voteType, postId } = await request.json();

		const post = await prisma.post.findFirst({
			where: {
				id: postId,
			},
		});

		const user = fetchUser();

		if (!post) {
			return NextResponse.json({ success: false, error: "No Post Found" });
		}

		const existingVote = await prisma.vote.findFirst({
			where: {
				postId,
				userId: user.id,
			},
		});

		if (existingVote) {
			const updatedVote = await prisma.vote.update({
				where: {
					id: existingVote.id,
				},
				data: {
					isUpvote: voteType,
				},
			});

			if (existingVote.isUpvote === voteType) {
				await prisma.vote.delete({
					where: {
						id: existingVote.id,
					},
				});

				return NextResponse.json({
					success: true,
					vote: updatedVote,
				});
			}

			const newVote = await prisma.vote.create({
				data: {
					postId,
					userId: user.id,
					isUpvote: voteType,
				},
			});

			const updatedPost = await prisma.post.update({
				where: {
					id: postId,
				},
				data: {
					votes: newVote,
				},
			});

			return NextResponse.json({
				success: true,
				vote: newVote,
				post: updatedPost,
			});
		} else {
			// Return a response in case existingVote is not found
			return NextResponse.json({
				success: false,
				error: "Vote not found",
			});
		}
	} catch (error) {
		return NextResponse.json({
			success: false,
			error: error.message,
		});
	}
}
