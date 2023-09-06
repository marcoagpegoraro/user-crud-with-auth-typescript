// 3rd Party Modules
import { Router } from 'express'
  
// Local Modules
import myController from '../controllers/usersController'
  
// Initialization
const router = Router();
  
// Requests 
router.get('/', myController.get);
router.get('/{id}', myController.getById);
router.post('/', myController.post);
  
export default router;