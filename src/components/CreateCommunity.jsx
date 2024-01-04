"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateCommunity() {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		const response = await fetch(`/api/subreddits`, {
			method: "POST",
			body: JSON.stringify({
				name,
			}),
		});
		const info = await response.json();
		if (info.error) {
			return setError(info.error);
		}
		setName("");
		router.refresh();
	}

	return (
		<div className="box-create-community">
			<textarea
				value={name}
				type="text"
				placeholder="r/"
				onChange={(e) => setName(e.target.value)}></textarea>
			<br />
			<button className="btn-community" type="submit" onClick={handleSubmit}>
				create community
			</button>
			<p>{error}</p>
		</div>
	);
}
