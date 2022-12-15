import { ProjectInfoService } from "../../services/ProjectInfoService";

const handler = async (event: any) => {
	const { id, path } = JSON.parse(event.body);

	if(!id && !path) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing info data."
			}),
		}
	}

	const projectInfoService = new ProjectInfoService();

	return await projectInfoService.execute({ id, path });
}

export { handler };
