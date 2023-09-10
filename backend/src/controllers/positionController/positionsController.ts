import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Methods to be executed on routes
const get = async (req, res)=>{
    
    const positions = await prisma.position.findMany()

    res.send(positions);
}

// Export of all methods as object
export default {
    get
}