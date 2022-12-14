import { prisma } from "../prisma/prismaClient";

interface IProject {
	title?: string;
	tags?: string[];
	platform?: string;
}

class SearchProjectService {
	async execute({ title, tags, platform }: IProject) {
		const results = await prisma.project.findMany({
			where: {
				title: {
					contains: title,
					mode: 'insensitive',
				},
				platform: {
					contains: platform,
					mode: 'insensitive'
				},
				//tags: {
				//	hasSome: tags,
				//}
			},

			take: 15,
		});

		results.map((project) => {
			return {
				path: project.path,
				title: project.title,
				description: project.description,
				id: project.id
			}
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Search ran successfully.",
				projects: results,
			})
		};
	}
}

export { SearchProjectService };
