import {prisma} from "../prisma/prismaClient";
import {createError} from "../utils/createError";
import {getIdFromToken} from "../utils/getIdFromToken";

interface UserAlterations {
	username?: string;
	accounts?: string;
	picture?:  string;
}

class ChangeService {
	async execute(user_alterations: UserAlterations, token: string) {
		if(user_alterations.username) {
			const usernameAlreadyInUse = await prisma.user.findUnique({
				where: {
					username: user_alterations.username
				}
			});

			if(usernameAlreadyInUse) {
				return createError("This username is already being used.");
			}
		}

		const id = getIdFromToken(token);

		const updateUser = await prisma.user.update({
			where: {
				id
			},
			data: {
				...user_alterations
			}
		})

		if(!updateUser) {
			return createError("User could not be updated.");
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "User changed successfully!",
			})
		};
	}
}

export { ChangeService };
