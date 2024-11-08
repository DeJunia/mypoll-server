import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import { errorMiddleware } from "./middleware/error.js";
import userRoutes from "./routes/user.routes.js";
import partyRoutes from "./routes/party.routes.js";
import voteRoutes from "./routes/vote.routes.js";
import postRoutes from "./routes/post.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'https://mypoll.vercel.app', // Allow only your frontend origin
  methods: 'GET,POST,PUT,DELETE', // Specify the allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/parties", partyRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/posts", postRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();