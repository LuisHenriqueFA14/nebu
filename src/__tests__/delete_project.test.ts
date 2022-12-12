import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { handler as deleteProjectFunction } from "../functions/delete_project/delete_project";

describe('Delete_project function', () => {
	var token: string;
	var projectId: string;

	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "delete_project",
				name: "Delete Project",
				email: "delete_project@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({ body: JSON.stringify({
				username: "delete_project",
				password: "abc123",
			})
		})).body).token;

		projectId = JSON.parse((await createFunction({
			body: JSON.stringify({
				title: "Delete_Project",
				platform: "GitHub",
				link: "https://github.com/deleteproject/deleteproject"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		})).body).project_id;
	});

	it('should not be able to delete project without a token.', async () => {
		const response = await deleteProjectFunction({
			body: JSON.stringify({
				id: projectId,
				password: 'abc123',
			}),
			headers: {
				authorization: ``,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to delete project without an id.', async () => {
		const response = await deleteProjectFunction({
			body: JSON.stringify({
				id: "",
				password: "abc123"
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to delete project with a wrong password.', async () => {
		const response = await deleteProjectFunction({
			body: JSON.stringify({
				id: projectId,
				password: "aaa123",
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should be able to delete project with no errors.', async () => {
		const response = await deleteProjectFunction({
			body: JSON.stringify({
				id: projectId,
				password: "abc123",
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});
})
