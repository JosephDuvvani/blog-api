import express from "express";
import cors from "cors";
import { auth, posts } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/posts", posts);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
