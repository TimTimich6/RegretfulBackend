"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = exports.createUser = void 0;
const lib_1 = __importDefault(require("../lib"));
const uuid_1 = require("uuid");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashed = (0, uuid_1.v4)();
            const user = yield lib_1.default.user.create({
                data: {
                    hash: hashed,
                },
                include: {
                    liked: true,
                    Story: true,
                },
            });
            if (user)
                res.json({ hash: hashed, id: user.id });
        }
        catch (error) {
            res.status(401).json({ error, message: "Can't create the user" });
        }
    });
}
exports.createUser = createUser;
function getAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield lib_1.default.user.findUnique({
                where: {
                    id: req.params.id,
                },
                include: { Story: true, liked: true },
            });
            console.log(user);
            if (user)
                res.json({ user, id: user.id, message: "found user" });
        }
        catch (error) {
            res.status(401).json({ error, message: "Can't find user" });
        }
    });
}
exports.getAccount = getAccount;
//# sourceMappingURL=usercontroller.js.map