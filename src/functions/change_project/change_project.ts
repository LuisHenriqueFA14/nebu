import { ChangeProjectService } from "../../services/ChangeProjectService";

const handler = async (event: any) => {
	const { id, title, description, platform, link, tags } = JSON.parse(event.body);
	const token = event.headers.authorization;

	if(!id && !title && !description && !platform && !link && !tags) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing changing data."
			}),
		}
	}

	const changeProjectService = new ChangeProjectService();

	return await changeProjectService.execute({ id, title, description, platform, link, tags }, token);
}

export { handler };
