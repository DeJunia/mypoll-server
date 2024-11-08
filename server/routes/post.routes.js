import express from 'express';
import { createPost, likePost, addComment, getPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.post('/:postId/like', verifyToken, likePost);
router.post('/:postId/comment', verifyToken, addComment);
router.get('/', getPosts);

export default router; 