import { LoginService } from "../../services/LoginService";

const handler = async (event: any) => {
	const { username, email, password } = JSON.parse(event.body);

	if((!username && !email) || !password) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing login data."
			}),
		}
	}

	const loginService = new LoginService();

	return await loginService.execute({ username, email, password });
}

export { handler }
