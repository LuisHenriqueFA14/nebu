import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as updateFunction } from "../functions/update/update";

describe('Update function', () => {
	var token: string;

	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "update",
				name: "Update",
				email: "update@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "update",
				password: "abc123",
			})
		})).body).token;
	});

	it('should not be able to update the username of the user without a token.', async () => {
		const response = await updateFunction({
			body: JSON.stringify({
				username: '__change',
			}),
			headers: {
				authorization: ``,
			}
		});

		expect(response.statusCode).toBe(400);
	});


	it('should be able to update the username of the user.', async () => {
		const response = await updateFunction({
			body: JSON.stringify({
				username: '__change',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});


	it('should be able to update the accounts of the user.', async () => {
		const response = await updateFunction({
			body: JSON.stringify({
				accounts: ["https://github.com/features"],
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});

	it('should be able to update the picture of the user.', async () => {
		const response = await updateFunction({
			body: JSON.stringify({
				picture: 'https://good_picture.png'
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});
})
