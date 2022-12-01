import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { prisma } from "../prisma/prismaClient";

describe('Cadaster function', () => {
	it("should be able to create a new user.", async () => {
		await prisma.user.deleteMany();

		const response = await cadasterFunction({
			body: JSON.stringify({
				username: "test",
				name: "Test Test",
				email: "test@gmail.com",
				password: "abc123"
			})
		});

		expect(response.statusCode).toBe(200);
	});

	it("should not be able to create a new user with an used username.", async () => {
		const response = await cadasterFunction({
			body: JSON.stringify({
				username: "test",
				name: "Test Test",
				email: "test2@gmail.com",
				password: "abc123"
			})
		});

		expect(response.statusCode).toBe(400);
	});

	it("should not be able to create a new user with an used email.", async () => {
		const response = await cadasterFunction({
			body: JSON.stringify({
				username: "test2",
				name: "Test Test",
				email: "test@gmail.com",
				password: "abc123"
			})
		});

		expect(response.statusCode).toBe(400);
	});
})
