import express from "express";
import { getUserInformation, getUsers } from "./controller/user.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/user", getUsers);
app.post("/user", getUserInformation);

app.get("/", (req, res) => res.send("Yo!"));

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server is listening at http://localhost:${PORT}`);
});

export default app;
