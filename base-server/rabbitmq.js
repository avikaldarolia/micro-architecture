import amqp from "amqplib";

let channel = null;

export const connectRabbitMQ = async (rabbitUrl) => {
	try {
		const connection = await amqp.connect(rabbitUrl);
		channel = await connection.createChannel();
		console.log("Connected to Rabbit MQ");
	} catch (error) {
		console.log("Error connecting to queue: ", error);
	}
};

export const publishToQueue = async (queueName, message) => {
	if (channel) {
		await channel.assertQueue(queueName, { durable: false });
		channel.sendToQueue(queueName, Buffer.from(message));

		console.log(`Message sent to queue ${message}`);
	} else {
		console.error("No RabbitMQ channel available");
	}
};
