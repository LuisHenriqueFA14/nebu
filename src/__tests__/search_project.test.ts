import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { handler as searchProjectFunction } from "../functions/search_project/search_project";

describe('Search_project function', () => {
	beforeAll(async () => {
		let token: string;

		await cadasterFunction({
			body: JSON.stringify({
				username: "search_project",
				name: "Search Project",
				email: "search_project@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "search_project",
				password: "abc123",
			})
		})).body).token;

		await createFunction({
			body: JSON.stringify({
				title: "Search_Project",
				platform: "GitHub",
				link: "https://github.com/search_project/search_project"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		});

		await createFunction({
			body: JSON.stringify({
				title: "Search_Project2",
				platform: "GitLab",
				link: "https://gitlab.com/search_project/search_project"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	});

	it("should receive at least two projects when searching for 'search'.", async () => {
		const response = await searchProjectFunction({
			body: JSON.stringify({}),
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body).projects.length).toBeGreaterThanOrEqual(2);
	});

	it("should receive only one project when searching for a project using 'gitlab'.", async () => {
		const response = await searchProjectFunction({
			body: JSON.stringify({
				platform: "gitlab",
			}),
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body).projects.length).toEqual(1);
	});
})
