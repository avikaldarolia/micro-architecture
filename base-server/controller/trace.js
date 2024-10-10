import { publishToQueue } from "../rabbitmq.js";

const queueName = "logQueue";
/**
 * Pushes the trace of the request in the queue
 * @param {*} reqId Id of the request
 * @param {*} reqBody The body of the request
 * @param {*} res Result associated with the request
 */
export const sendTrace = async (reqId, reqBody = null, res = null) => {
	try {
		const msgData = {
			reqId,
			reqBody,
			res,
		};

		// Creating a buffer from a json string
		const message = Buffer.from(JSON.stringify(msgData));
		await publishToQueue(queueName, message);
	} catch (error) {
		console.log(error);
	}
};
