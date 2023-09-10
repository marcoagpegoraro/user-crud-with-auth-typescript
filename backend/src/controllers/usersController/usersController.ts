import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as multer from 'multer';

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.memoryStorage(), // Store the uploaded file in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
});

// Methods to be executed on routes
const get = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const post = (req: Request, res: Response) => {
  const body = req.body

  res.send(body);
}

// Export of all methods as object
export default {
  get,
  getById,
  post
}