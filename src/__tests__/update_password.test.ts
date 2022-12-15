import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as updatePasswordFunction } from "../functions/update_password/update_password";

describe('Update_password function', () => {
	var token: string;

	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "update_password",
				name: "Change Password",
				email: "update_password@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "update_password",
				password: "abc123",
			})
		})).body).token;
	});

	it("should not be able to update the password since the new password and the old password are the same.", async () => {
		const response = await updatePasswordFunction({
			body: JSON.stringify({
				oldPassword: 'abc321',
				newPassword: 'abc321',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it("should not be able to update the password without an authentication token.", async () => {
		const response = await updatePasswordFunction({
			body: JSON.stringify({
				oldPassword: 'abc123',
				newPassword: 'abc321',
			}),
			headers: {
				authorization: ``,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it("should be able to update the password with no errors.", async () => {
		const response = await updatePasswordFunction({
			body: JSON.stringify({
				oldPassword: 'abc123',
				newPassword: 'abc321',
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});
})
