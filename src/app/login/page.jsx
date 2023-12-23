"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	async function handleLogin(e) {
		e.preventDefault();
		const response = await fetch("/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});
		const info = await response.json();
		if (info.error) {
			return setError(info.error);
		}

		router.push("/");
		router.refresh();
	}

	return (
		<div>
			<h3>Log In</h3>
			<form onSubmit={handleLogin}>
				<input
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
				<br />
				<input
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type="password"
				/>
				<br />
				<button type="submit">Login</button>
				<p>{error}</p>
			</form>
		</div>
	);
}
