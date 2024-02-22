import express from "express";

const router = express.Router();

import {
  createPost,
  fetchAllPost,
  editPost,
  deletePost,
  getSinglePost,
} from "../controllers/postController.js";

import auth from "../middleware/auth.js";

router.post("/posts", createPost);
router.get("/posts", fetchAllPost);
router.put("/posts/edit/:id", auth, editPost);
router.delete("/posts/edit/:id", auth, deletePost);
router.get("/post/:id", getSinglePost);

export default router;
