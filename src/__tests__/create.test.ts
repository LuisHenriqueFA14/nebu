import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as loginFunction } from "../functions/login/login";
import { handler as createFunction } from "../functions/create/create";
import { prisma } from "../prisma/prismaClient";

describe('Create function', () => {
	var token: string;

	beforeAll(async () => {
		await prisma.project.deleteMany();

		await cadasterFunction({
			body: JSON.stringify({
				username: "create",
				name: "Create",
				email: "create@gmail.com",
				password: "abc123"
			})
		});

		token = JSON.parse((await loginFunction({
			body: JSON.stringify({
				username: "create",
				password: "abc123",
			})
		})).body).token;
	});

	it("should be able to create a new project.", async () => {
		const response = await createFunction({
			body: JSON.stringify({
				title: "nebu",
				platform: "GitHub",
				link: "https://github.com/luishenriquefa14/nebu"
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(200);
	});

	it("should not be able to create a new project with an used title.", async () => {
		const response = await createFunction({
			body: JSON.stringify({
				title: "nebu",
				platform: "GitHub",
				link: "https://github.com/luishenriquefa14/nebu"
			}),
			headers: {
				authorization: `Bearer ${token}`,
			}
		});

		expect(response.statusCode).toBe(400);
	});

	it("should not be able to create a new project without a token.", async () => {
		const response = await createFunction({
			body: JSON.stringify({
				title: "nebu",
				platform: "GitHub",
				link: "https://github.com/luishenriquefa14/nebu"
			}),
			headers: {
				authorization: ``,
			}
		});

		expect(response.statusCode).toBe(400);
	});
})
