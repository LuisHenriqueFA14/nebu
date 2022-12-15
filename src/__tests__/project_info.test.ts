import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { handler as projectInfoFunction } from "../functions/project_info/project_info";

describe('Project_info function', () => {
	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "project_info",
				name: "Project Info",
				email: "project_info@gmail.com",
				password: "abc123"
			})
		});

		const token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "project_info",
				password: "abc123",
			})
		})).body).token;

		await createFunction({
			body: JSON.stringify({
				title: "Project_Info",
				platform: "GitHub",
				link: "https://github.com/project_info/project_info"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	});

	it('should not be able to get info of a project without path or id', async () => {
		const response = await projectInfoFunction({
			body: JSON.stringify({}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to get info of a project with an invalid path', async () => {
		const response = await projectInfoFunction({
			body: JSON.stringify({
				path: 'randomuser/doesnotexist'
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to get info of a project with an invalid id', async () => {
		const response = await projectInfoFunction({
			body: JSON.stringify({
				id: 'doesnotexist'
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should be able to get info of a project', async () => {
		const response = await projectInfoFunction({
			body: JSON.stringify({
				path: 'project_info/Project_Info'
			}),
		});

		expect(response.statusCode).toBe(200);
	});
})
