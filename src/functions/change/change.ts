import { ChangeService } from "../../services/ChangeService";

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

	const changeService = new ChangeService();

	return await changeService.execute({ username, accounts, picture }, token);
}

export { handler };
