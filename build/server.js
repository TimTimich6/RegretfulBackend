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
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3080;
app.use(express_1.default.json({ limit: "200mb" }));
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/users", userroute_1.default);
app.use("/api/posts", postroute_1.default);
server.listen(PORT, () => {
    console.log("listening on port", PORT);
});
