import express from 'express';
import { castVote, getVoteResults, getTotalVotes } from '../controllers/vote.controller.js';
import { verifyToken, checkVoteStatus } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, checkVoteStatus, castVote);
router.get('/results', getVoteResults);
router.get('/total', getTotalVotes);

export default router; 