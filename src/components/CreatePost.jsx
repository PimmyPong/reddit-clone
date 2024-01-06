"use client";
import Subreddit from "@/app/subreddits/[subredditId]/page.jsx";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreatePost({ subreddits }) {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	// const [select, setSelect] = useState("");
	const [error, setError] = useState("");
	const [subreddit, setSubreddit] = useState("");
	const router = useRouter();

	async function handleSubmitPost(e) {
		e.preventDefault();

		const response = await fetch(`/api/posts`, {
			method: "POST",
			body: JSON.stringify({
				title,
				message,
				subredditId: subreddit,
			}),
		});

		const info = await response.json();
		if (info.error) {
			setError(info.error);
			router.refresh();
		} else {
			setTitle("");
			setMessage("");
			// router.push(`/posts/${info.post.id}`);
			router.push(`/subreddits/${info.post.subredditId}`);
			router.refresh();
		}
		setSubreddit("");
	}

	return (
		<div>
			{/* <h2>{`Create a Post in /r${subreddit.name}`}</h2> */}
			<div className="select">
				<select
					required
					value={subreddit}
					onChange={(e) => setSubreddit(e.target.value)}>
					<option value="">Create a Post </option>
					{subreddits.map((subreddit) => (
						<option key={subreddit.id} value={subreddit.id}>
							{subreddit.name}
						</option>
					))}
				</select>
			</div>

			<form className="box-title">
				<textarea
					required
					id="title"
					value={title}
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}></textarea>
				<br />
				<textarea
					required
					id="message"
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
			</form>
		</div>
	);
}
