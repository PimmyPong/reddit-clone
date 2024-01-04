import CreatePost from "@/components/CreatePost.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function NewPost(params) {
	const subreddit = await prisma.subreddit.findFirst({
		where: {
			id: params.subredditId,
		},
	});

	return (
		<div>
			<CreatePost subreddit={subreddit} />
		</div>
	);
}
