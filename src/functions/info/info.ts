import { InfoService } from "../../services/InfoService";

const handler = async (event: any) => {
	const { id, username } = JSON.parse(event.body);

	if(!id && !username) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing info data."
			}),
		}
	}

	const infoService = new InfoService();

	return await infoService.execute({ id, username });
}

export { handler };
