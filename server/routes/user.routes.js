import express from 'express';
import { register, login, updateProfile, deleteAccount } from '../controllers/user.controller.js';
import { verifyToken, validateGhanaCard } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateGhanaCard, register);
router.post('/login', login);
router.put('/profile', verifyToken, updateProfile);
router.delete('/delete', verifyToken, deleteAccount);

export default router; 