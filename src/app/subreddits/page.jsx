import CreateCommunity from "@/components/CreateCommunity.jsx";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function SubReddits() {
	const subreddits = await prisma.subreddit.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: true, // Include the user information for each subreddit
		},
	});
	return (
		<div className="box-community">
			<div className="cc-btn">
				
				<CreateCommunity />
			</div>

			{subreddits.map((subreddit) => (
				<div key={subreddit.id} className="box-name">
					<span className="subreddit-create-by">
						<Link
							href={`/subreddits/${subreddit.id}`}
							style={{ textDecoration: "none" }}>
							/r
							{subreddit.name}
						</Link>
					</span>
					<span className="create-by">{`Created by: ${subreddit.user.username}`}</span>
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
