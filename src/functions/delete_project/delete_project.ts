import { DeleteProjectService } from '../../services/DeleteProjectService';

const handler = async (event: any) => {
	const { id, password } = JSON.parse(event.body);
	const token = event.headers.authorization;

	if(!token) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] You are not logged in."
			}),
		}
	}

	if(!id || !password) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing deleting data."
			}),
		}
	}

	const deleteProjectService = new DeleteProjectService();
	
	return await deleteProjectService.execute({ id, password }, token);
}

export { handler };
