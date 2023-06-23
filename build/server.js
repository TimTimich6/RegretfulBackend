"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const userroute_1 = __importDefault(require("./routes/userroute"));
const postroute_1 = __importDefault(require("./routes/postroute"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const newesetversion = "1.0.3";
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3080;
app.use(express_1.default.json({ limit: "200mb" }));
console.log(path_1.default.join(__dirname, "public", "html"));
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/users", userroute_1.default);
app.use("/api/posts", postroute_1.default);
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "home.html"));
});
app.get("/eula", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "eula.html"));
});
app.get("/privacy", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "privacy.html"));
});
app.get("/support", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "support.html"));
});
app.get("/version", (req, res) => {
    res.json({ version: newesetversion });
});
server.listen(PORT, () => {
    console.log("listening on port", PORT);
});
//# sourceMappingURL=server.js.map