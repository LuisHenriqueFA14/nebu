import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { prisma } from "../prisma/prismaClient";

describe('Cadaster function', () => {
	beforeAll(async () => {
		await prisma.user.deleteMany();
	});

	it("should be able to create a new user.", async () => {

		const response = await cadasterFunction({
			body: JSON.stringify({
				username: "cadaster",
				name: "Cadaster",
				email: "cadaster@gmail.com",
				password: "abc123"
			})
		});

		expect(response.statusCode).toBe(200);
	});

	it("should not be able to create a new user with an used username.", async () => {
		const response = await cadasterFunction({
			body: JSON.stringify({
				username: "cadaster",
				name: "Cadaster",
				email: "cadaster2@gmail.com",
				password: "abc123"
			})
		});

		expect(response.statusCode).toBe(400);
	});

	it("should not be able to create a new user with an used email.", async () => {
		const response = await cadasterFunction({
			body: JSON.stringify({
				username: "cadaster2",
				name: "Cadaster",
				email: "cadaster@gmail.com",
				password: "abc123"
			})
		});

		expect(response.statusCode).toBe(400);
	});
})
