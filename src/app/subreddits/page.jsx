import CreateCommunity from "@/components/CreateCommunity.jsx";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function SubReddits() {
	const subreddits = await prisma.subreddit.findMany();
	return (
		<div className="box-community">
			<CreateCommunity />

			{subreddits.map((subreddit) => (
				<div key={subreddit.id} className="box-name">
					<Link
						href={`/subreddits/${subreddit.id}`}
						style={{ textDecoration: "none" }}>
						/r
						{subreddit.name}
						
					</Link>
					
				</div>
			))}
		</div>
	);
}

//server
/*
createCommunity component
community name
title and message

*/
