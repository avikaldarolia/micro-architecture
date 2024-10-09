import { query } from "../db";

export const recordTrace = async (req, res, next) => {
	const body = req.body;
	console.log(body);

	try {
	} catch (error) {
		return res.send(error);
	}
};
