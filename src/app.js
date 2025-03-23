import express from "express";
import { auth } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/auth", auth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
