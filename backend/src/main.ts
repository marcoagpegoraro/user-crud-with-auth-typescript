import * as express from 'express'

import 'dotenv/config'

// Local Modules
import tokenRoutes from './routes/tokenRoutes';
  
// Server Initialization
const app = express();
const PORT = process.env.PORT;
  
// Middlewares
app.use(express.json());
  
// Routes will be written here
app.use('/token', tokenRoutes); 
  
// Server Listen Along with Database 
// connection(in case of data persistence)
app.listen(PORT, () =>
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
);