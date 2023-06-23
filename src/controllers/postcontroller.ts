import { Request, Response } from "express";
import prisma from "../lib/index";

export async function createPost(req: any, res: Response) {
  const body = req.body;
  const { content } = body;
  console.log("here");

  try {
    const story = await prisma.story.create({
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
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 200, message: "faild to created" });
  }
}

export async function getPost(req: any, res: Response) {
  const id = req.params.id;
  try {
    const story = await prisma.story.findUnique({ where: { id } });
    if (story) {
      res.json({ status: 200, message: "created", story });
    }
  } catch (error) {
    res.status(500).json({ status: 200, message: "created" });
  }
}

export async function getFiltered(req: Request, res: Response) {
  const userid = req.headers.authorization;
  const filter = req.query.filter;
  console.log("h", filter, userid);

  try {
    let stories: {
      content: string;
      id: string;
      likes: {
        id: string;
        userId: string;
      }[];
      authorId: string;
    }[] = [];
    if (filter == "authored") {
      stories = await prisma.story.findMany({
        where: { authorId: userid },
        select: { authorId: true, content: true, id: true, likes: { select: { userId: true, id: true } } },
      });
    } else if (filter == "liked") {
      stories = await prisma.story.findMany({
        where: { likes: { some: { userId: userid } } },
        select: { authorId: true, content: true, id: true, likes: { select: { userId: true, id: true } } },
      });
    }

    res.json(stories);
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 200, message: "error" });
  }
}

export async function likePost(req: any, res: Response) {
  const postid: string = req.params.id;
  const userid: string = req.headers.authorization;
  try {
    console.log(req.headers);

    const like = await prisma.like.create({
      data: {
        postId: postid,
        userId: userid,
      },
      select: { userId: true, id: true },
    });
    if (like) {
      res.json({ status: 200, message: "liked", like });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 200, message: "not able to like" });
  }
}
export async function unlikePost(req: any, res: Response) {
  const likeid: string = req.params.id;
  const userid: string = req.headers.authorization;
  console.log(likeid);

  try {
    // console.log(req.headers);

    const like = await prisma.like.delete({ where: { id: likeid } });
    if (like) {
      res.json({ status: 200, message: "unliked", like });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 200, message: "unliked" });
  }
}

export async function getAll(req: any, res: Response) {
  try {
    const stories = await prisma.story.findMany({
      select: { authorId: true, content: true, id: true, likes: { select: { userId: true, id: true } } },
    });
    if (stories) {
      // console.log(stories.forEach((story) => console.log(story.likes)));

      res.json(stories);
    }
  } catch (error) {
    res.status(500).json({ status: 200, message: "created" });
  }
}
