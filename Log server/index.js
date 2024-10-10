import express from "express";
import dotenv from "dotenv";
import { connectRabbitMQ } from "./rabbitmq.js";
import { query } from "../Base server/db.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const RabbitMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const QUEUE_NAME = process.env.QUEUE_NAME || "logQueue";

// Process Messages received from the queue
const processMessage = async (message) => {
	console.log("Message Received: ", message);

	// *** OPTIONAL ***
	const msg = JSON.parse(message);
	console.log(msg);
	const reqId = msg.reqId;
	const reqbody = JSON.stringify(msg.reqBody) || "";
	const returnedResult = JSON.stringify(msg.res) || "";
	try {
		await query(
			"INSERT INTO logs (req_id, req_body, res) VALUES ($1, $2, $3) RETURNING *",
			[reqId, reqbody, returnedResult]
		);
	} catch (error) {
		console.log(error);
	}
};

connectRabbitMQ(RabbitMQ_URL, QUEUE_NAME, processMessage);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
	console.log(`Log server listening on port ${PORT}`);
});
