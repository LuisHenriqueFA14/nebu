import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";

class ProjectInfoService {
	async execute({ id, path }) {
		let where = {};

		if(id) {
			where = { id };
		} else {
			where = { path };
		}

		const project = await prisma.project.findFirst({
			where
		});

		if(!project) {
			return createError("Project not found.");
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Project found!",
				project: {
					id: project.id,
					owner_id: project.owner,
					title: project.title,
					description: project.description,
					path: project.path,
					platform: project.platform,
					link: project.link,
					tags: project.tags,
				}
			})
		};
	}
}

export { ProjectInfoService };
