"use client";
import { useRouter } from "next/navigation.js";
import { useState, useEffect } from "react";
import { fetchUser } from "@/lib/fetchUser.js";

export default function CreateComment({ user, subredditId, parentId, post }) {
	const [commentText, setCommentText] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleClick(e) {
		e.preventDefault();

		const response = await fetch(`/api/posts`, {
			method: "POST",
			body: JSON.stringify({
				message: commentText,
				subredditId,
				parentId,
			}),
		});
		const info = await response.json();
		if (info.error) {
			setError(info.error);
		}
		setCommentText(""); // Clear the comment text input
		router.refresh();
	}
	return (
		<div className="box-comment">
			<form onSubmit={handleClick}>
				{/* user is undifined */}
				<label className="comment-as">{`Comment as: ${user.username}`} </label>
				<textarea
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					className="comment-box"
					placeholder="What are your thought?"></textarea>
				<p>{error}</p>
				<button type="submit" className="btn-comment">
					comment
				</button>
			</form>
			{/* <div className="comment-list">{comments}</div> */}
		</div>
	);
}
