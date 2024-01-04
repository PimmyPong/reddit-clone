"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreatePost({ subreddit }) {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	// const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	async function handleSubmitPost(e) {
		e.preventDefault();
		// setIsSubmitting(true);

		const response = await fetch(`/api/posts`, {
			method: "POST",
			body: JSON.stringify({
				title,
				message,
				subredditId: subreddit.id,
			}),
		});

		const info = await response.json();
		if (info.error) {
			setError(info.error);
		} else {
			setTitle("");
			setMessage("");
			// setIsSubmitting(false);
			router.push(`/posts/${info.post.id}`);
		}
	}

	return (
		<div>
			<h2>{`Create a Post in /r${subreddit.name}`}</h2>
			<div className="box-title">
				<textarea
					value={title}
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}></textarea>
				<br />
				<textarea
					className="box-message"
					value={message}
					placeholder="Message"
					onChange={(e) => setMessage(e.target.value)}></textarea>
				<p>{error}</p>

				<button
					className="btn-comment"
					type="submit"
					onClick={handleSubmitPost}
					// disabled={isSubmitting}
				>
					POST
				</button>
			</div>
		</div>
	);
}
