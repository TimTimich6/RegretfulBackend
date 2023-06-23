import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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

export async function getAccount(req: any, res: any) {
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
