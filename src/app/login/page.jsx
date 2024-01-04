"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isPopUp, setIsPopUp] = useState(false);

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
	const handleClosePopup = () => {
		setIsPopUp(true);
		router.push("/");
		router.refresh();
	};

	return (
		<div className="overlay">
			<div className="popup">
				<span className="close" onClick={handleClosePopup}>
					x
				</span>
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
					<button className="button-users" type="submit">
						Login
					</button>
					<div className="register">
						New to Reddit?{" "}
						<Link href={"/register"} style={{ textDecoration: "none" }}>
							Register
						</Link>
					</div>
					<p>{error}</p>
				</form>
			</div>
		</div>
	);
}
