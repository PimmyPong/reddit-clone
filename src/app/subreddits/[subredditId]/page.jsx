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
		include: {
			user: true, // Include the user information for each subreddit
		},
	});

	return (
		<div>
			<span className="create-post-in">
				<Link href={`/posts`} style={{ textDecoration: "none" }}>
					<span className="subreddit-id">{`Create post`}</span>
				</Link>
			</span>

			{posts.map(async (post) => {
				const comments = await countComments(post);
				const user = post.user; // Access user information directly from the post
				return (
					<Post
						key={post.id}
						post={post}
						subreddit={subreddit}
						user={user}
						comments={comments}
					/>
				);
			})}
		</div>
	);
}
