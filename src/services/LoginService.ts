import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface User {
	username?: string,
	email?: string,
	password: string,
};

class LoginService {
	async execute(user_params: User) {
		let where: any;

		if(user_params.email) {
			where = {
				email: user_params.email,
			}
		} else {
			where = {
				username: user_params.username,
			}
		}

		const user = await prisma.user.findUnique({
			where
		});

		if(!user) {
			return createError("User/Password incorrect.");
		}

		const passwordMatch = await compare(user_params.password, user.password);

		if(!passwordMatch) {
			return createError("User/Password incorrect.");
		}

		const token = sign({ id: user.id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '21d' });

		return {
			statusCode: 200,
			body: JSON.stringify({
				token,
				message: "User logged successfully!",
			})
		};
	}
}

export { LoginService };
