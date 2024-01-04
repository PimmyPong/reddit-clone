"use client";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";

export default function Logout() {
	const router = useRouter();
	return (
		<Link
			style={{ textDecoration: "none" }}
			onClick={async () => {
				const response = await fetch("/api/users/logout", {
					method: "POST",
				});
				const info = response.json();
				router.refresh();
			}}
			href={"/"}>
			Logout
		</Link>
	);
}
