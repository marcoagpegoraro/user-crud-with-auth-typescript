import { Request, Response } from "express";

// Methods to be executed on routes
const get = (req: Request, res: Response)=>{
    res.send("Hello, Welcome to our Page");
}
  
const getById = (req: Request, res: Response)=>{
    res.send("Hello, This was a post Request");
}

const post = (req: Request, res: Response)=>{
    const body = req.body 

    res.send(body);
}

// Export of all methods as object
export default {
    get,
    getById,
    post
}