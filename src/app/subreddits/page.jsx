import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function SubReddits() {
	const subreddits = await prisma.subreddit.findMany();
	return (
		<div>
			<h1>Subreddits</h1>
			{subreddits.map((subreddit) => (
				<div key={subreddit.id}>
					<Link href={`subreddits/${subreddit.id}`}>{subreddit.name}</Link>
				</div>
			))}
		</div>
	);
}
