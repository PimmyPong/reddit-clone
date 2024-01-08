import Post from "@/components/Post.jsx";
import { prisma } from "@/lib/prisma.js";
import { countComments } from "@/lib/countComments.js";
import { fetchUser } from "@/lib/fetchUser.js";
import CreateComment from "@/components/CreateComment.jsx";
import Reply from "@/components/Reply.jsx";

export default async function RedditPost({ params }) {
	const { postId } = params;
	const post = await prisma.post.findFirst({
		where: {
			id: postId,
			// parentId: null,
		},
		include: {
			user: true,
			children: true,
			votes: true,
		},
	});

	// if (!post) {
	// 	return null;
	// }

	const subreddit = await prisma.subreddit.findFirst({
		where: {
			id: post.subredditId,
		},
	});

	const user = await fetchUser();
	const commentsCount = await countComments(post);

	const comments = await prisma.post.findMany({
		// orderBy: {
		// 	createdAt: "desc",
		// },
		where: {
			parentId: postId,
		},
		include: {
			user: {
				select: { username: true },
			},
		},
	});

	const renderReply = (comment) => (
		<Reply
			key={comment.id}
			comment={comment}
			postId={postId}
			user={user}
			post={post}>
			{comment.children && comment.children.map(renderReply)}
		</Reply>
	);

	const votes = await prisma.vote.findFirst({
		where: {
			id: postId,
		},
		include: {
			user: true,
		},
	});
	return (
		<div className="posts-id">
			<Post
				vote={votes}
				post={post}
				subreddit={subreddit}
				comments={commentsCount}
				user={user}
			/>
			<div>
				<CreateComment
					user={user}
					subredditId={post.subredditId}
					parentId={postId}
					post={post}
				/>

				{/* {comments.map((comment) => {
					const user = comment.user;
					return <Reply key={comment.id} comment={comment} user={user} />;
				})} */}
				<div>{comments.map((comment) => renderReply(comment))}</div>
			</div>
		</div>
	);
}
