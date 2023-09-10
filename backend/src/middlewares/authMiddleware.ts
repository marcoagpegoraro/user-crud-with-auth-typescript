import { NextFunction, Response } from "express"
import * as jwt from 'jsonwebtoken'
import { RequestWithUser, User } from "../dto/RequestWithUser"

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {

  const token = req.headers['authorization'] as string

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token is missing' })
  }

  const tokenWithoutBearer = token.replace("Bearer ", "")

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET) as User

    // Attach the decoded user information to the request for later use
    req.user = decoded

    // Continue with the next middleware or route handler
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token is invalid' })
  }
}