import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import Logout from "./Logout.jsx";

export default async function NavBar() {
	const user = await fetchUser();
	return (
		<div className="navbar">
			<Link href={"/"} style={{ textDecoration: "none" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 24 24">
					<path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
				</svg>
				Home
			</Link>

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
