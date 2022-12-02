import { CreateService } from "../../services/CreateService";

interface Project {
	title: string;
	description?: string;
	platform: string;
	link: string;
	tags?: string[];
}

const handler = async (event: any) => {
	const project: Project = JSON.parse(event.body);
	const token = event.headers.authorization;

	if(!project.title || !project.platform || !project.link) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing creation data."
			}),
		}
	}

	if(!token) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] You are not logged in."
			}),
		}
	}

	const createService = new CreateService();

	return await createService.execute(project, token);
}

export { handler };
