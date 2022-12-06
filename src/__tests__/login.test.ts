import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { prisma } from "../prisma/prismaClient";

describe('Login function', () => {
	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "login",
				name: "Login",
				email: "login@gmail.com",
				password: "abc123"
			})
		});
	});

	it("should be able to login an user using username.", async () => {
		const response = await loginFunction({
			body: JSON.stringify({
				username: "login",
				password: "abc123"
			}),
		});

		expect(response.statusCode).toBe(200);
	});

	it("should be able to login an user using email.", async () => {
		const response = await loginFunction({
			body: JSON.stringify({
				email: "login@gmail.com",
				password: "abc123"
			}),
		});

		expect(response.statusCode).toBe(200);
	});

	it("should not be able to login an user without the fields.", async () => {
		const response = await loginFunction({ body: JSON.stringify({}) });

		expect(response.statusCode).toBe(400);
	});

	it("should not be able to login an user with an invalid username.", async () => {
		const response = await loginFunction({
			body: JSON.stringify({
				username: "nothinghere",
				password: "abc123"
			}),
		});

		expect(response.statusCode).toBe(400);
	});

	it("should not be able to login an user with an invalid email.", async () => {
		const response = await loginFunction({
			body: JSON.stringify({
				email: "nothinghere@gmail.com",
				password: "abc123"
			}),
		});

		expect(response.statusCode).toBe(400);
	});
})
