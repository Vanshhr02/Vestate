import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import{getUsers, getUser,updateUser,deleteUser  } from '../controllers/user_controllers.js'

const router = express.Router();
router.get('/' , getUsers);
router.get('/:id' ,verifyToken, getUser);
router.post('/updateUser/:id' ,verifyToken, updateUser);
router.post('/:id' ,verifyToken, deleteUser);

export default router;