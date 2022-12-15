import { UpdateService } from "../../services/UpdateService";

const handler = async (event: any) => {
	const { username, accounts, picture } = JSON.parse(event.body);
	const token = event.headers.authorization;

	if(!username && !accounts && !picture) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing changing data."
			}),
		}
	}

	const updateService = new UpdateService();

	return await updateService.execute({ username, accounts, picture }, token);
}

export { handler };
