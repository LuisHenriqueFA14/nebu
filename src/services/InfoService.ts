import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";

class InfoService {
	async execute({ id, username }) {
		let where = {};

		if(id) {
			where = { id };
		} else {
			where = { username };
		}

		const user = await prisma.user.findFirst({
			where
		});

		if(!user) {
			return createError("User not found.");
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "User found!",
				user: {
					id: user.id,
					username: user.username,
					projects: user.projects,
					accounts: user.accounts,
					picture: user.picture
				}
			})
		};
	}
}

export { InfoService };
