import { InfoProjectService } from "../../services/InfoProjectService";

const handler = async (event) => {
	const { id, path } = JSON.parse(event.body);

	if(!id && !path) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing info data."
			}),
		}
	}

	const infoProjectService = new InfoProjectService();

	return await infoProjectService.execute({ id, path });
}

export { handler };
