import { Request, Response } from "express";
import prisma from "../lib";
import { v4 } from "uuid";
export async function createUser(req: Request, res: Response) {
  try {
    const hashed = v4();
    const user = await prisma.user.create({
      data: {
        hash: hashed,
      },
      include: {
        liked: true,
        Story: true,
      },
    });
    if (user) res.json({ hash: hashed, id: user.id });
  } catch (error) {
    res.status(401).json({ error, message: "Can't create the user" });
  }
}

export async function getAccount(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      include: { Story: true, liked: true },
    });
    console.log(user);

    if (user) res.json({ user, id: user.id, message: "found user" });
  } catch (error) {
    res.status(401).json({ error, message: "Can't find user" });
  }
}

export async function blockAccount(req: Request, res: Response) {
  const blockingid = req.params.id;
  const userid = req.headers.authorization;
  try {
    const user = await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        blocked: { push: blockingid },
      },
    });
    console.log(user);

    if (user) res.json({ user, id: user.id, message: "blocked user" });
  } catch (error) {
    res.status(401).json({ error, message: "Can't find user" });
  }
}
