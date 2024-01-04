"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isPopUp, setIsPopUp] = useState(false);

	const router = useRouter();

	async function handleRegister(e) {
		e.preventDefault();
		const response = await fetch("/api/users/register", {
			method: "POST",
			body: JSON.stringify({ username, password }),
		});
		const info = await response.json();
		console.log(info);
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
				<form onSubmit={handleRegister}>
					<span className="close" onClick={handleClosePopup}>
						x
					</span>
					<h3>Register</h3>
					<input
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<br />
					<input
						value={password}
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<button className="button-users">Register</button>
					<p>{error}</p>
				</form>
			</div>
		</div>
	);
}

// "use client";
// import { useRouter } from "next/navigation.js";
// import { useState } from "react";

// export default function Register() {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	// const [error, setError] = useState("");

// 	const router = useRouter;

// 	async function handleRegister(e) {
// 		e.preventDefault();
// 		const response = await fetch("api/users/register", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ username, password }),
// 		});
// 		// const info = await response.json();
// 		// if (info.error) {
// 		// 	setError(info.error);
// 		// }
// 		// router.push("/");
// 		// router.refresh();
// 	}
// 	return (
// 		<div>
// 			<h3>Register</h3>
// 			<form onSubmit={handleRegister}>
// 				<input
// 					placeholder="Username"
// 					onChange={(e) => setUsername(e.target.value)}
// 					value={username}
// 				/>
// 				<br />
// 				<input
// 					placeholder="password"
// 					onChange={(e) => setPassword(e.target.value)}
// 					value={password}
// 					type="password"
// 				/>
// 				<br />
// 				<button>Register</button>
// 				{/* <p>{error}</p> */}
// 			</form>
// 		</div>
// 	);
// }
