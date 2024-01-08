import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function PUT(request, response) {
	try {
		const { postId } = response.params;
		const { title, message, parentId } = await request.json();
		const user = await fetchUser();

		const findPost = await prisma.post.findFirst({
			where: {
				id: postId,
			},
		});

		if (!findPost) {
			return NextResponse.json({
				success: false,
				error: "Post not found",
			});
		} else if (!user.id) {
			return NextResponse.json({
				success: false,
				error: "Please log in to edit the post",
			});
		} else if (user.id !== findPost.userId) {
			return NextResponse.json({
				success: false,
				error: "You can not edit someone else's post",
			});
		}

		let post = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				title: title,
				message: message,
				parent: parentId,
			},
		});

		return NextResponse.json({ success: true, post });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}

export async function DELETE(request, response) {
	try {
		const { postId } = response.params;

		const user = await fetchUser();

		const findPost = await prisma.post.findFirst({
			where: {
				id: postId,
			},
		});

		if (!user) {
			return NextResponse.json({
				success: false,
				error: "Authentication required. Please log in to delete the post",
			});
		}
		if (!findPost) {
			return NextResponse.json({
				success: false,
				error: "No post found with that ID",
			});
		}

		if (user.id !== findPost.userId) {
			return NextResponse.json({
				success: false,
				error: "You can not delete someone else's post",
			});
		}

		const post = await prisma.post.delete({
			where: {
				id: postId,
			},
		});
		return NextResponse.json({
			success: true,
			message: "Your post has been successfully deleted",
		});
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}
