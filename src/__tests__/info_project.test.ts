import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { handler as infoProjectFunction } from "../functions/info_project/info_project";

describe('Info_project function', () => {
	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "info_project",
				name: "Info Project",
				email: "info_project@gmail.com",
				password: "abc123"
			})
		});

		const token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "info_project",
				password: "abc123",
			})
		})).body).token;

		await createFunction({
			body: JSON.stringify({
				title: "Info_Project",
				platform: "GitHub",
				link: "https://github.com/info_project/Info_Project"
			}),
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	});

	it('should not be able to get info of a project without path or id', async () => {
		const response = await infoProjectFunction({
			body: JSON.stringify({}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to get info of a project with an invalid path', async () => {
		const response = await infoProjectFunction({
			body: JSON.stringify({
				path: 'randomuser/doesnotexist'
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to get info of a project with an invalid id', async () => {
		const response = await infoProjectFunction({
			body: JSON.stringify({
				id: 'doesnotexist'
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should be able to get info of a project', async () => {
		const response = await infoProjectFunction({
			body: JSON.stringify({
				path: 'info_project/Info_Project'
			}),
		});

		expect(response.statusCode).toBe(200);
	});
})
