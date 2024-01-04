import Post from "@/components/Post.jsx";
import { prisma } from "@/lib/prisma.js";
import { countComments } from "@/lib/countComments.js";
import { fetchUser } from "@/lib/fetchUser.js";
import Comment from "@/components/Comment.jsx";
async function displayComments(post, level) {
	const comments = await prisma.post.findMany({
		where: {
			parentId: post.id,
		},
	});
	const divs = [];
	for (const c of comments) {
		divs.push(<div className="indent">{displayComments(c, level + 1)}</div>);
	}
	if (post.parentId) {
		divs.splice(
			0,
			0,
			<div className="comment">
				<Comment post={post}></Comment>
			</div>
		);  
	}
	return divs;
}

export default async function RedditPost({ params }) {
	const post = await prisma.post.findFirst({
		where: {
			id: params.postId,
		},
	});

	if (!post) {
		return (
			<div>
				<p>Post not found!</p>
			</div>
		);
	}
	const subreddit = await prisma.subreddit.findFirst({
		where: {
			id: post.subredditId,
		},
	});

	const user = await fetchUser();
	const commentsCount = await countComments(post);
	return (
		<div>
			<Post
				post={post}
				subreddit={subreddit}
				commentsCount={commentsCount}
				comments={<div>{displayComments(post)}</div>}
				user={user}
			/>
		</div>
	);
}
