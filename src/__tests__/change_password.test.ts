import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as changePasswordFunction } from "../functions/change_password/change_password";

describe('Change_password function', () => {
	var token: string;

	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "change_password",
				name: "Change Password",
				email: "change_password@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "change_password",
				password: "abc123",
			})
		})).body).token;
	});

	it("should not be able to change the password since the new password and the old password are the same.", async () => {
		const response = await changePasswordFunction({
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

	it("should not be able to change the password without an authentication token.", async () => {
		const response = await changePasswordFunction({
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

	it("should be able to change the password with no errors.", async () => {
		const response = await changePasswordFunction({
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
