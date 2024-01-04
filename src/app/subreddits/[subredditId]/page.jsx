import { prisma } from "@/lib/prisma.js";
import Post from "@/components/Post.jsx";
import { countComments } from "@/lib/countComments.js";
import Link from "next/link.js";
import { fetchUser } from "@/lib/fetchUser.js";
export default async function Subreddit({ params }) {
	// access parameter by param in arg
	// how to access that param?
	// subreddit name as a title
	const { subredditId } = params;
	const subreddit = await prisma.subreddit.findFirst({
		where: {
			id: subredditId,
		},
	});
	const posts = await prisma.post.findMany({
		where: {
			
			subredditId,
			parentId: null,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div key={posts.subredditId}>
			<span className="create-post-in">
				<Link
					href={`/createPost/${subredditId}`}
					style={{ textDecoration: "none" }}>
					<span className="subreddit-id">{`Create post in /r${subreddit.name}`}</span>
				</Link>
			</span>

			{posts.map(async (post) => (
				<Post
					post={post}
					subreddit={subreddit}
					user={fetchUser()}
					comments={await countComments(post)}
				/>
			))}
		</div>
	);
}
