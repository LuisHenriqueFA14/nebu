import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";
import bcryptjs from "bcryptjs";

interface User {
	username: string;
	name: string;
	email: string;
	password: string;
}

class CadasterService {
	async execute(user_params: User) {
		const usernameAlreadyExists = await prisma.user.findFirst({
			where: {
				username: user_params.username,
			}
		});

		if(usernameAlreadyExists) {
			return createError("Username already in use.");
		}

		const emailAlreadyExists = await prisma.user.findFirst({
			where: {
				email: user_params.email,
			}
		});

		if(emailAlreadyExists) {
			return createError("Email already in use.");
		}

		const hash = await bcryptjs.hash(user_params.password, 8);
		
		const user = await prisma.user.create({
			data: {
				username: user_params.username,
				email: user_params.email,
				name: user_params.name,
				password: hash,
			},
		});

		if (!user) {
			return createError("User could not be created.");
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "User created successfully!",
				user_id: user.id,
			})
		};
	}
}

export { CadasterService };
