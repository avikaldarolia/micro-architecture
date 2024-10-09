import { publishToQueue } from "../rabbitmq.js";

const queueName = "logQueue";
export const sendTrace = async (reqId, reqBody = null, res = null) => {
	try {
		const msgData = {
			reqId,
			reqBody,
			res,
		};
		console.log("msgData", msgData);

		const message = Buffer.from(JSON.stringify(msgData));
		await publishToQueue(queueName, message);
	} catch (error) {
		console.log(error);
	}
};
