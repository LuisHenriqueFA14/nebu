import { verify } from "jsonwebtoken";

interface IPayLoad {
	id: string;
}

function getIdFromToken(token: string) {
	const [, jwt_token] = token.split(" ");

	try {
		const { id } = verify(jwt_token, process.env.JWT_SECRET_TOKEN) as IPayLoad;

		return id;
	} catch(err) {
		return undefined;
	}
}

export { getIdFromToken }
