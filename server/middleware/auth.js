import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Access denied!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return next(errorHandler(403, "Invalid token."));
    req.user = user;
    next();
  });
};

export const validateGhanaCard = (req, res, next) => {
  const { ghanaCard } = req.body;
  const ghanaCardRegex = /^GHA-\d{9}-\d$/;
  
  if (!ghanaCardRegex.test(ghanaCard)) {
    return next(errorHandler(400, "Invalid Ghana Card format. Use GHA-123456789-1 format"));
  }
  
  next();
};

export const checkVoteStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.hasVoted) {
      return next(errorHandler(403, "User has already voted"));
    }
    next();
  } catch (error) {
    next(error);
  }
}; 