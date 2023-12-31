import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import SubReddits from "./subreddits/page.jsx";
import Subreddit from "./subreddits/[subredditId]/page.jsx";
export const dynamic = "force-dynamic";

export default async function Home({ params }) {
	const subreddits = await prisma.subreddit.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
	const user = await fetchUser();
	const posts = await prisma.post.findMany({
		include: {
			user: true,
			votes: true,
			subreddit: true,
			children: {
				include: {
					user: true,
					votes: true,
					children: true,
				},
			},
			parent: true,
		},
	});

	return (
		<div className="">
			<SubReddits />
		</div>
	);
}
