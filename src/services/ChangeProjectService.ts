import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";
import { getIdFromToken } from "../utils/getIdFromToken";

interface ProjectAlterations {
	id: string;
	title?: string;
	description?: string;
	platform?: string;
	link?: string;
	tags?: string[];
}

class ChangeProjectService {
	async execute(project_alterations: ProjectAlterations, token: string) {
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

		if(project_alterations.title) {
			const projectNameAlreadyInUse = await prisma.project.findFirst({
				where: {
					path: `${user.username}/${project_alterations.title}`,
				}
			});

			if(projectNameAlreadyInUse) {
				return createError("This title is already being used.");
			}
		}

		const project = await prisma.project.findUnique({
			where: {
				id: project_alterations.id
			}
		});

		if(!project) {
			return createError("Project does not exist.");
		}

		const { id: _, ...data } = project_alterations;

		var path: string;

		if(project_alterations.title) {
			path = `${user.username}/${project_alterations.title}`;
		} else {
			path = `${user.username}/${project.title}`;
		}

		const updateProject = await prisma.project.update({
			where: {
				id: project_alterations.id
			},
			data: {
				path,
				...data,
			}
		})

		if(!updateProject) {
			return createError("Project could not be updated.");
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Project changed successfully.",
			})
		};
	}
}

export { ChangeProjectService };
