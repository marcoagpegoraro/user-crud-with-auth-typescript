import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';

import { uploadPhoto, validateFields, validatePhoto } from "../../services/postUserIntoDatabaseService";
import { User } from "../../services/dto/User";
import userDatabaseToUserResponseMapper from "./mapper/UserDatabaseToUserResponseMapper";

const prisma = new PrismaClient();


// Methods to be executed on routes
const get = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        position: true
      }
    });

    const usersReponse = users.map(user => userDatabaseToUserResponseMapper(user))

    res.json({success: true, users: usersReponse});
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
      include: {
        position: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({success: true, user: userDatabaseToUserResponseMapper(user)});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const post = async (req: Request, res: Response) => {
  const [isFieldsValid, errorMessageFields] = await validateFields(req.fields as unknown as User)

  if (!isFieldsValid) {
    res.status(400).json({ success: false, message: errorMessageFields })
    return
  }

  const photo = req.files.photo

  const [isPhotoValid, errorMessagePhoto] = await validatePhoto(photo)

  if (!isPhotoValid) {
    res.status(400).json({ success: false, message: errorMessagePhoto })
    return
  }

  const photoId = uuidv4()
  uploadPhoto(photo, photoId)

  const serverUrl = `${req.protocol}://${req.get('host')}`;

  let userCreated

  try {

    userCreated = await prisma.user.create({
      data: {
        name: `${req.fields.name}`,
        email: `${req.fields.email}`,
        phone: `${req.fields.phone}`,
        photo: `${serverUrl}/public/images/${photoId}.jpg`,
        position_id: parseInt(`${req.fields.position_id}`)
      },
    });
  }
  catch (e) {
    res.status(400).json({ success: false, message: 'User already exist: ' + req.fields.email });
    return
  }

  res.status(201).json({ success: true, message: 'user created successfully: ' + req.fields.name });
}

// Export of all methods as object
export default {
  get,
  getById,
  post
}