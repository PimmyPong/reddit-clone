"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Delete({ post }) {
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleDelete(e) {
		e.preventDefault();
		const response = await fetch(`/api/posts/${post.id}`, {
			method: "DELETE",
		});

		const info = await response.json();
		if (info.error) {
			setError(info.error);
		}
		router.push(`/subreddits/${post.subredditId}`);
		router.refresh();
	}

	return (
		<div>
			<span>
				<span type="button" onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrashAlt} /> Delete
				</span>
			</span>
			<p>{error}</p>
		</div>
	);
}
