"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateComment({comments}) {
	const [comment, setComment] = useState("");
	const router = useRouter();

	async function handleClick(e) {
		e.preventDefault();
		// Update the comments state with the new comment including user.id

			const response = await fetch(`/api/posts`, {
				method: "POST",
				body: JSON.stringify({
					message: comment,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const info = await response.json();
			

	}
	return (
		<div>
			<div className="box-comment">
				<label className="comment-as">Comment as: </label>

				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className="comment-box"
					placeholder="What are your thought?"></textarea>
				<button onClick={handleClick} className="btn-comment">
					comment
				</button>
			</div>

			<div className="comment-list">
				<h3>Comments</h3>
				{comments}
			</div>
		</div>
	);
}
