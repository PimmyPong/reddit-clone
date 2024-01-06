"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateCommunity() {
	const [name, setName] = useState("");
	const [isPost, setIsPost] = useState(false);
	const [error, setError] = useState(false);
	const [x, setX] = useState(false);
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
		} else {
			setName("");
			setIsPost(false);
			router.refresh();
		}
	}
	function handleCreate() {
		setIsPost(true);
		router.refresh();
	}

	const handleX = () => {
		setX(false);
		router.push("/");
		router.refresh();
	};

	return (
		<div className="box-create-community">
			{isPost && (
				<div>
					<span className="close" onClick={handleX}>
						x
					</span>
					<textarea
						value={name}
						type="text"
						placeholder="r/"
						onChange={(e) => setName(e.target.value)}></textarea>
				</div>
			)}
			<br />
			{isPost ? (
				<button className="btn-community" type="submit" onClick={handleSubmit}>
					create community
				</button>
			) : (
				<button className="btn-community" onClick={handleCreate} type="button">
					CreateCommunity
				</button>
			)}

			<p>{error}</p>
		</div>
	);
}
