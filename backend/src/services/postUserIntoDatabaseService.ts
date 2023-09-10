import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { User } from "./dto/User"
const prisma = new PrismaClient()



export async function isFieldsValid(user: User): Promise<[boolean, string]> {
  if (!user || !user.name || !user.email || !user.phone || !user.position_id) {
    return [false, "One or more fields empty"]
  }

  // Validate Name
  if (user.name.length < 2 || user.name.length > 60) {
    return [false, 'Name should be 2-60 characters long.']
  }

  // Validate Email using RFC2822 regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!user.email.match(emailRegex)) {
    return [false, 'Email must be a valid email address according to RFC2822.']
  }

  // Validate Phone starts with +380 (Ukraine country code)
  if (!user.phone.startsWith('+380')) {
    return [false, 'Phone number should start with the Ukraine country code +380.']
  }

  const positions = await prisma.position.findMany()

  const isValidPosition = positions
    .filter(position => position.id == user.position_id)
    .length == 0

  if (isValidPosition) {
    return [false, 'Invalid Position ID. Please choose a valid position.']
  }

  return [true, null]
}

