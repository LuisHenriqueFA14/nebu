import { handler as cadasterFunction } from "../functions/cadaster/cadaster";
import { handler as searchFunction } from "../functions/search/search";

describe('Search function', () => {
	beforeAll(async () => {
		await cadasterFunction({
			body: JSON.stringify({
				username: "search",
				name: "search",
				email: "search@gmail.com",
				password: "abc123"
			})
		});

		await cadasterFunction({
			body: JSON.stringify({
				username: "search2",
				name: "search2",
				email: "search2@gmail.com",
				password: "abc123"
			})
		});
	});

	it("should not be able search without a username.", async () => {
		const response = await searchFunction({
			body: JSON.stringify({}),
		});

		expect(response.statusCode).toBe(400);
	});

	it("should receive at least two users when searching for 'search'.", async () => {
		const response = await searchFunction({
			body: JSON.stringify({
				username: "search",
			}),
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body).users.length).toBeGreaterThanOrEqual(2);
	});

	it("should receive only one user when searching for '2'.", async () => {
		const response = await searchFunction({
			body: JSON.stringify({
				username: "2",
			}),
		});

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body).users.length).toEqual(1);
	});
})
