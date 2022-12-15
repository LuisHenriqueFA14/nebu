import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";
import { getIdFromToken } from "../utils/getIdFromToken";

interface UserAlterations {
	username?: string;
	accounts?: string;
	picture?:  string;
}

class UpdateService {
	async execute(user_alterations: UserAlterations, token: string) {
		if(user_alterations.username) {
			const usernameAlreadyInUse = await prisma.user.findUnique({
				where: {
					username: user_alterations.username
				}
			});

			if(usernameAlreadyInUse) {
				return createError("This username is already being used.");
			}
		}

		const id = getIdFromToken(token);

		if(!id) {
			return createError("You are not logged in.");
		}

		const user = await prisma.user.findUnique({
			where: {
				id,
			}
		});

		if(!user) {
			return createError("You are not logged in.");
		}

		const updateUser = await prisma.user.update({
			where: {
				id
			},
			data: {
				...user_alterations
			}
		})

		if(!updateUser) {
			return createError("User could not be updated.");
		}

		if(user_alterations.username) {
			updateUser.projects.forEach(async (id) => {
				const project = await prisma.project.findFirst({
					where: {
						id,
					}
				});
				
				await prisma.project.update({
					where: {
						id
					},
					data: {
						path: `${updateUser.username}/${project.title}`,
					}
				})
			});
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "User changed successfully!",
			})
		};
	}
}

export { UpdateService };
