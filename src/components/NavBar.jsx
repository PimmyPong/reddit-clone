import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import Logout from "./Logout.jsx";
export default async function NavBar() {
	const user = await fetchUser();
	return (
		<div className="navbar">
			<Link href={"/"}>Home</Link>
			<Link href={"/subreddits"}>Subreddits</Link>
			{!user.id && (
				<>
					<Link href={"/login"}>login</Link>
					<Link href={"/register"}>Register</Link>
				</>
			)}

			{user.id && (
				<>
					<span>Welcome {user.username}</span>
					<Logout />
				</>
			)}
		</div>
	);
}
