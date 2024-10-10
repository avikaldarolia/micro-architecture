import amqplib from "amqplib";

export const connectRabbitMQ = async (rabbitUrl, queueName, callback) => {
	try {
		const connection = await amqplib.connect(rabbitUrl);
		const channel = await connection.createChannel();

		await channel.assertQueue(queueName, { durable: false });

		channel.consume(queueName, (msg) => {
			if (msg != null) {
				callback(msg.content.toString());
				channel.ack(msg);
			}
		});
	} catch (error) {
		console.error("Error connecting to RabbitMQ:", error);
	}
};
