import { query } from "../db.js";

export const getUsers = async (req, res) => {
	try {
		const result = await query("SELECT * FROM users");
		res.json(result.rows);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getUserInformation = async (req, res, next) => {
	const { username, codename } = req.body;
	try {
		const result = await query(
			"INSERT INTO users (username, codename) VALUES ($1, $2) RETURNING *",
			[username, codename]
		);

		return res.send(result.rows);
	} catch (error) {
		console.log(error);
		return res.send(error.detail);
	}
};
