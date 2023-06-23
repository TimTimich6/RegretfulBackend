import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/userroute";
import postRoute from "./routes/postroute";
import dotenv from "dotenv";
import http from "http";
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3080;
app.use(express.json({ limit: "200mb" }));

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
