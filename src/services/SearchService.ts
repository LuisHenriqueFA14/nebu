import {prisma} from "../prisma/prismaClient";

class SearchService {
	async execute(username: string) {
		const results = await prisma.user.findMany({
			where: {
				username: {
					contains: username,
					mode: 'insensitive',
				}
			},
			take: 10,
		});

		let users = [];

		results.forEach((user) => {
			users.push({
				id: user.id,
				name: user.name,
				username: user.username,
				picture: user.picture,
			});
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Search ran successfully.",
				users,
			})
		};
	}
}

export { SearchService };
