// 3rd Party Modules
import { Router } from 'express'
  
// Local Modules
import myController from '../controllers/positionController/positionsController'
  
// Initialization
const router = Router();
  
// Requests 
router.get('/', myController.get);
  
export default router;