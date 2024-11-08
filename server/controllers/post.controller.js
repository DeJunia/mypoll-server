import Post from '../models/post.model.js';
import { errorHandler } from '../middleware/error.js';

export const createPost = async (req, res, next) => {
  try {
    const { title, content, partyId, image } = req.body;
    const newPost = new Post({
      title,
      content,
      party: partyId,
      image
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    const likeIndex = post.likes.indexOf(req.user.id);
    if (likeIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    
    await post.save();
    res.status(200).json({
      likes: post.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    post.comments.push({
      user: req.user.id,
      content
    });
    
    await post.save();
    
    // Populate the new comment with user info
    const newComment = post.comments[post.comments.length - 1];
    await Post.populate(newComment, { path: 'user', select: 'username profilePic' });
    
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('party', 'name')
      .populate('likes', 'username profilePic')
      .populate('comments.user', 'username profilePic')
      .sort('-createdAt');
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}; 