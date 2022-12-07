import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { handler as changeProjectFunction } from "../functions/change_project/change_project";

describe('Change_project function', () => {
	var token: string;
	var projectId: string;

	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "change_project",
				name: "Change Project",
				email: "change_project@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "change_project",
				password: "abc123",
			})
		})).body).token;

		projectId = JSON.parse((await createFunction({
			body: JSON.stringify({
				title: "Change_Project",
				platform: "GitHub",
				link: "https://github.com/changeproject/changeproject"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		})).body).id;

		await createFunction({
			body: JSON.stringify({
				title: "Change_Project_2",
				platform: "GitHub",
				link: "https://github.com/changeproject/changeproject2"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	});

	it('should not be able to change project without a token.', async () => {
		const response = await changeProjectFunction({
			body: JSON.stringify({
				id: projectId,
				title: 'Change_Project_2',
			}),
			headers: {
				authorization: ``,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to change project without an id.', async () => {
		const response = await changeProjectFunction({
			body: JSON.stringify({
				title: 'Change_Project_2',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to change project when there is another one with this title.', async () => {
		const response = await changeProjectFunction({
			body: JSON.stringify({
				id: projectId,
				title: 'Change_Project_2',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it('should be able to change project with no errors.', async () => {
		const response = await changeProjectFunction({
			body: JSON.stringify({
				id: projectId,
				title: 'Other_Change_Project',
				description: 'A Good Project.',
				platform: 'GitHub',
				link: 'https://github.com/change_project/change_project2',
				tags: ['project', 'change', 'good', 'github'],
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});
})
