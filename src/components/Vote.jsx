"use client";

import { useRouter } from "next/navigation.js";

export default function Vote({ post,vote }) {
	const router = useRouter();

	async function updateVote(voteType) {
		const response = await fetch(`/api/votes`, {
			method: "POST",
			body: JSON.stringify({
				postId: post.id,
				voteType,
			}),
		});
		const data = await response.json();
		console.log(data);
	}

	const upVotes = post.vote?.filter((vote) => vote.isUpvote)?.length;
	const downVotes = post.vote?.filter((vote) => !vote.isUpvote)?.length;

	return (
		<div className="vote-con">
			<span type="button" onClick={() => updateVote(true)}>
				<svg
					fill="#000000"
					width="30px"
					height="20px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" />
				</svg>
			</span>
			<div>{upVotes - downVotes || 0}</div>
			<span type="button" onClick={() => updateVote(false)}>
				<svg
					fill="#000000"
					width="20px"
					height="20px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" />
				</svg>
			</span>
		</div>
	);
}
