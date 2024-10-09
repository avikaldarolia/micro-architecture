import express from "express";
import dotenv from "dotenv";
import { getUserInformation, getUsers } from "./controller/user.js";
import { connectRabbitMQ } from "./rabbitmq.js";

dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

// Connect to RabbitMQ
connectRabbitMQ(RABBITMQ_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", getUsers);
app.post("/user", getUserInformation);

app.get("/", (res) => res.send("Yo!"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});

export default app;
