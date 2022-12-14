import { SearchProjectService } from "../../services/SearchProjectService";

interface IProject {
	title?: string;
	tags?: string[];
	platform?: string;
}

const handler = async (event) => {
	const project: IProject = JSON.parse(event.body);

	const searchProjectService = new SearchProjectService();

	return searchProjectService.execute({ ...project });
}

export { handler };
