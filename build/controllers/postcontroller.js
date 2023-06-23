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
exports.getAll = exports.unlikePost = exports.likePost = exports.getFiltered = exports.getPost = exports.createPost = void 0;
const index_1 = __importDefault(require("../lib/index"));
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const { content } = body;
        console.log("here");
        try {
            const story = yield index_1.default.story.create({
                data: {
                    content,
                    author: {
                        connect: {
                            id: req.headers.authorization,
                        },
                    },
                },
                include: { author: true, likes: true },
            });
            if (story) {
                res.json({ status: 200, message: "created", story });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ status: 200, message: "faild to created" });
        }
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const story = yield index_1.default.story.findUnique({ where: { id } });
            if (story) {
                res.json({ status: 200, message: "created", story });
            }
        }
        catch (error) {
            res.status(500).json({ status: 200, message: "created" });
        }
    });
}
exports.getPost = getPost;
function getFiltered(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = req.headers.authorization;
        const filter = req.query.filter;
        console.log("h", filter, userid);
        try {
            let stories = [];
            if (filter == "authored") {
                stories = yield index_1.default.story.findMany({
                    where: { authorId: userid },
                    select: { authorId: true, content: true, id: true, likes: { select: { userId: true, id: true } } },
                });
            }
            else if (filter == "liked") {
                stories = yield index_1.default.story.findMany({
                    where: { likes: { some: { userId: userid } } },
                    select: { authorId: true, content: true, id: true, likes: { select: { userId: true, id: true } } },
                });
            }
            res.json(stories);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ status: 200, message: "error" });
        }
    });
}
exports.getFiltered = getFiltered;
function likePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postid = req.params.id;
        const userid = req.headers.authorization;
        try {
            console.log(req.headers);
            const like = yield index_1.default.like.create({
                data: {
                    postId: postid,
                    userId: userid,
                },
                select: { userId: true, id: true },
            });
            if (like) {
                res.json({ status: 200, message: "liked", like });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ status: 200, message: "not able to like" });
        }
    });
}
exports.likePost = likePost;
function unlikePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const likeid = req.params.id;
        const userid = req.headers.authorization;
        console.log(likeid);
        try {
            // console.log(req.headers);
            const like = yield index_1.default.like.delete({ where: { id: likeid } });
            if (like) {
                res.json({ status: 200, message: "unliked", like });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ status: 200, message: "unliked" });
        }
    });
}
exports.unlikePost = unlikePost;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stories = yield index_1.default.story.findMany({
                select: { authorId: true, content: true, id: true, likes: { select: { userId: true, id: true } } },
            });
            if (stories) {
                // console.log(stories.forEach((story) => console.log(story.likes)));
                res.json(stories);
            }
        }
        catch (error) {
            res.status(500).json({ status: 200, message: "created" });
        }
    });
}
exports.getAll = getAll;
