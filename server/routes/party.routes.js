import express from 'express';
import { createParty, getAllParties } from '../controllers/party.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createParty);
router.get('/', getAllParties);

export default router; 