import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as multer from 'multer';
import * as path from 'path'
import { validateFields, validatePhoto } from "../../services/postUserIntoDatabaseService";
import { User } from "../../services/dto/User";

const prisma = new PrismaClient();


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

const post = async (req: Request, res: Response) => {
  const [isFieldsValid, errorMessageFields] =  await validateFields(req.fields as unknown as User)

  if(!isFieldsValid){
    res.status(400).json({success: false, message: errorMessageFields})
    return
  }

  const [isPhotoValid, errorMessagePhoto] =  await validatePhoto(req.files.photo)

  if(!isPhotoValid){
    res.status(400).json({success: false, message: errorMessagePhoto})
    return
  }


 
  res.send("a");
}

// Export of all methods as object
export default {
  get,
  getById,
  post
}