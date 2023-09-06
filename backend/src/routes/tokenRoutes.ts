// 3rd Party Modules
import { Router } from 'express'
  
// Local Modules
import myController from '../controllers/tokenController/tokenController'  
// Initialization
const router = Router();
  
// Requests 
router.get('/', myController.get);
  
export default router;