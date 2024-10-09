import { query } from "../db.js";
import { sendTrace } from "./trace.js";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async (req, res) => {
	try {
		const req_id = uuidv4();
		await sendTrace(req_id, JSON.stringify(req.body));

		const result = await query("SELECT * FROM users");
		await sendTrace(req_id, req.body, result.rows);

		return res.json(result.rows);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getUserInformation = async (req, res, next) => {
	const { username, codename } = req.body;
	try {
		const req_id = uuidv4();
		await sendTrace(req_id, JSON.stringify(req.body));

		const result = await query(
			"INSERT INTO users (username, codename) VALUES ($1, $2) RETURNING *",
			[username, codename]
		);

		await sendTrace(
			req_id,
			JSON.stringify(req.body),
			JSON.stringify(result.rows)
		);

		return res.send(result.rows);
	} catch (error) {
		console.log(error);
		return res.send(error.detail);
	}
};
