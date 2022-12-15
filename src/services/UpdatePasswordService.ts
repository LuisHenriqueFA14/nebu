import {compare, hash} from "bcryptjs";
import { prisma } from "../prisma/prismaClient";
import { createError } from "../utils/createError";
import { getIdFromToken } from "../utils/getIdFromToken";

class UpdatePasswordService {
	async execute({ oldPassword, newPassword }, token: string) {
		const id = getIdFromToken(token);

		if(!id) {
			return createError("You are not logged in.");
		}

		if(oldPassword === newPassword) {
			return createError("Old password and new password cannot be the same.");
		}

		const user = await prisma.user.findUnique({
			where: {
				id
			}
		});

		if(!user) {
			return createError("You are not logged in.");
		}

		const passwordMatch = await compare(oldPassword, user.password);
		
		if(!passwordMatch) {
			return createError("Old password is incorrect.");
		}

		const hashedPassword = await hash(newPassword, 8);

		await prisma.user.update({
			where: {
				id,
			},
			data: {
				password: hashedPassword,
			}
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Password changed successfully!",
			})
		};
	}
}

export { UpdatePasswordService };
