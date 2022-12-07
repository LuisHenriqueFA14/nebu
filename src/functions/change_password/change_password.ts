import { ChangePasswordService } from "../../services/ChangePasswordService";

const handler = async (event: any) => {
	const { oldPassword, newPassword } = JSON.parse(event.body);
	const token = event.headers.authorization;

	if(!token) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] You are not logged in."
			}),
		}
	}

	if(!oldPassword || !newPassword) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "[ERROR] Missing changing data."
			}),
		}
	}

	const changePasswordService = new ChangePasswordService();

	return await changePasswordService.execute({ oldPassword, newPassword }, token);
}

export { handler };
