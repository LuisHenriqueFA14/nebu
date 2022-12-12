import { prisma } from "../prisma/prismaClient";
import { compare } from "bcryptjs";
import { createError } from "../utils/createError";
import { getIdFromToken } from "../utils/getIdFromToken";

class DeleteProjectService {
	async execute({ id, password }, token) {
		const userId = getIdFromToken(token);

		if(!userId) {
			return createError("You are not logged in.");
		}

		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			}
		});

		if(!user) {
			return createError("You are not logged in.");
		}

		const passwordMatch = await compare(password, user.password);

		if(!passwordMatch) {
			return createError("Password is incorrect.");
		}

		const deleteProject = await prisma.project.delete({
			where: {
				id,
			}
		});

		if(!deleteProject) {
			return createError("Could not delete project.");
		}

		const index = user.projects.indexOf(deleteProject.id);

		if (index >= 0) {
			user.projects.splice(index, 1);
		}

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				projects: user.projects,
			}
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Project deleted successfully!",
			})
		};
	}
}

export { DeleteProjectService };
