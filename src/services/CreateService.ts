import { createError } from "../utils/createError";
import { prisma } from "../prisma/prismaClient";
import { getIdFromToken } from "../utils/getIdFromToken";

interface Project {
	title: string;
	description?: string;
	platform: string;
	link: string;
	tags?: string[];
}

class CreateService {
	async execute(project_params: Project, token: string) {
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

		const projectAlreadyExists = await prisma.project.findFirst({
			where: {
				path: `${user.username}/${project_params.title}`,
			}
		})

		if(projectAlreadyExists) {
			return createError("This project name is already in use.");
		}

		const project = await prisma.project.create({
			data: {
				owner: id,
				title: project_params.title,
				description: project_params.description,
				path: `${user.username}/${project_params.title}`,
				platform: project_params.platform,
				link: project_params.link,
				tags: project_params.tags,
			}
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Project created successfully!",
				project_id: project.id,
				path: project.path,
			})
		};

	}
}

export { CreateService };
