import CreatePost from "@/components/CreatePost.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function NewPost(params) {
	const subreddits = await prisma.subreddit.findMany();

	return (
		<div>
			<CreatePost subreddits={subreddits} />
		</div>
	);
}
