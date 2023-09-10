import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

// Methods to be executed on routes
const get = async (req: Request, res: Response)=>{
    
    const positions = await prisma.position.findMany()

    res.send(positions);
}

// Export of all methods as object
export default {
    get
}