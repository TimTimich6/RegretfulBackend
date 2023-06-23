import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/userroute";
import postRoute from "./routes/postroute";
import dotenv from "dotenv";
import http from "http";
import path from "path";
dotenv.config();

const newesetversion = "1.0.3";

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3080;
app.use(express.json({ limit: "200mb" }));
console.log(path.join(__dirname, "public", "html"));

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "home.html"));
});
app.get("/eula", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "eula.html"));
});

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "privacy.html"));
});

app.get("/support", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "support.html"));
});

app.get("/version", (req, res) => {
  res.json({ version: newesetversion });
});

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
