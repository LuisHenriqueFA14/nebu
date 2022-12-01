import { CadasterService } from "../../services/CadasterService";

const handler = async (event: any) => {
	const { username, name, email, password } = JSON.parse(event.body);

	if (!username || !name || !email || !password) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing cadaster data."
			}),
		}
	}

	const createService = new CadasterService();

	return await createService.execute({ username, name, email, password });
}

export { handler };
