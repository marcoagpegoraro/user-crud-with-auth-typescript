import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

// Methods to be executed on routes
const get = (req: Request, res: Response) => {
    const id = 1; //any id
    const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 60 * 40 // expires in 40 min
    });

    return res.json({ success: true, token: token });
}

// Export of all methods as object
export default {
    get
}