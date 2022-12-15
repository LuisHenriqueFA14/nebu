import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { handler as updateProjectFunction } from "../functions/update_project/update_project";

describe('Update_project function', () => {
	var token: string;
	var projectId: string;

	beforeAll(async () => {
		const cadaster = await cadasterFunction({
			body: JSON.stringify({
				username: "update_project",
				name: "Update Project",
				email: "update_project@com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "update_project",
				password: "abc123",
			})
		})).body).token;

		projectId = JSON.parse((await createFunction({
			body: JSON.stringify({
				title: "Update_Project",
				platform: "GitHub",
				link: "https://github.com/updateproject/updateproject"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		})).body).project_id;

		await createFunction({
			body: JSON.stringify({
				title: "Update_Project_2",
				platform: "GitHub",
				link: "https://github.com/updateproject/updateproject2"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	});

	it('should not be able to update project without a token.', async () => {
		const response = await updateProjectFunction({
			body: JSON.stringify({
				id: projectId,
				title: 'Update_Project_2',
			}),
			headers: {
				authorization: ``,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to update project without an id.', async () => {
		const response = await updateProjectFunction({
			body: JSON.stringify({
				title: 'Update_Project_2',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to update project when there is another one with this title.', async () => {
		const response = await updateProjectFunction({
			body: JSON.stringify({
				id: projectId,
				title: 'Update_Project_2',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should be able to update project with no errors.', async () => {
		const response = await updateProjectFunction({
			body: JSON.stringify({
				id: projectId,
				title: 'Other_Update_Project',
				description: 'A Good Project.',
				platform: 'GitHub',
				link: 'https://github.com/update_project/update_project2',
				tags: ['project', 'update', 'good', 'github'],
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});
})
