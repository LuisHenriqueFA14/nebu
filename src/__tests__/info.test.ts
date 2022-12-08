import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as infoFunction } from "../functions/info/info";

describe('Info function', () => {
	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "info",
				name: "Info",
				email: "info@gmail.com",
				password: "abc123"
			})
		});
	});

	it('should not be able to get info of an user without username or id', async () => {
		const response = await infoFunction({
			body: JSON.stringify({}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to get info of an user with an invalid username', async () => {
		const response = await infoFunction({
			body: JSON.stringify({
				username: 'doesnotexist'
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should not be able to get info of an user with an invalid id', async () => {
		const response = await infoFunction({
			body: JSON.stringify({
				id: 'doesnotexist'
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it('should be able to get info of an user', async () => {
		const response = await infoFunction({
			body: JSON.stringify({
				username: 'info'
			}),
		});

		expect(response.statusCode).toBe(200);
	});
})
