import { SearchService } from "../../services/SearchService";

const handler = async (event: any) => {
	const { username } = JSON.parse(event.body);

	if(!username) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing search data."
			}),
		}
	}

	const searchService = new SearchService();

	return searchService.execute({ username });
}

export { handler };
