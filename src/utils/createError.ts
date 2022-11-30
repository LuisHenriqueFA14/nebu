function createError(error: string) {
	return {
		statusCode: 400,
		body: JSON.stringify({
			message: "[ERROR] " + error
		}),
	}
}

export { createError };
