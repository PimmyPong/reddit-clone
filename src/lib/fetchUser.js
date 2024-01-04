import { cookies } from "next/headers.js";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma.js";

export async function fetchUser() {
	// check if theres a cookie that says' token
	try {
		const cookieStore = cookies();
		const userCookie = cookieStore.get("token");

		if (!userCookie) {
			return {};
		}
		// we have to determine if the token is valid
		const { userId } = jwt.verify(userCookie.value, process.env.JWT_SECRET);

		// we can send a request to the db to fetch this user
		const user = await prisma.user.findFirst({ where: { id: userId } });
		if (user) {
			delete user.password;
		}

		return user || {};
	} catch (error) {
		return {};
	}
}
