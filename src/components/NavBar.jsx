import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import Logout from "./Logout.jsx";
export default async function NavBar() {
	const user = await fetchUser();
	return (
		<div className="navbar">
			<Link href={"/"} style={{ textDecoration: "none" }}>Home</Link>

			<Link href={"/subreddits"} style={{ textDecoration: "none" }}>
				Subreddits
			</Link>

			{!user.id && (
				<>
					<Link href={"/login"} style={{ textDecoration: "none" }}>
						Login
					</Link>
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
