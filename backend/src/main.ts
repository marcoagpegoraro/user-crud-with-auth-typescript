import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser';
import * as formidableMiddleware from 'express-formidable';

import 'dotenv/config'

// Local Modules
import tokenRoutes from './routes/tokenRoutes';
import usersRoutes from './routes/usersRoutes';
import positionsRoutes from './routes/positionsRoutes';
import { authMiddleware } from './middlewares/authMiddleware';



// Server Initialization
const app = express();
const PORT = process.env.PORT;
  
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(formidableMiddleware());
app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use(express.json());
  
// Routes will be written here
app.use('/api/v1/token', tokenRoutes); 

app.use('/api/v1/users', authMiddleware, usersRoutes); 
app.use('/api/v1/positions',authMiddleware, positionsRoutes); 
  
// Server Listen Along with Database 
// connection(in case of data persistence)
app.listen(PORT, () =>
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
);