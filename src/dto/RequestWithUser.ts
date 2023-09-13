import { Request } from 'express';

// Define a custom interface that extends the Request type
export interface RequestWithUser extends Request {
  user: User
}

export interface User {
    id: number
}