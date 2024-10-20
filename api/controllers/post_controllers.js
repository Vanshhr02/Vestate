import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: req.query.city || undefined,
        type: req.query.type || undefined,
        property: req.query.property || undefined,
        bedroom: parseInt(req.query.bedroom) || undefined,
        price: {
          gte: parseInt(req.query.minPrice) || undefined,
          lte: parseInt(req.query.maxPrice) || undefined,
        },
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: { select: { username: true, avatar: true } },
      },
    });

    const token = req.cookies?.token;
    let isSaved = false;

    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (payload) {
        const savedPost = await prisma.savedPost.findUnique({
          where: { userId_postId: { postId: id, userId: payload.id } },
        });
        isSaved = !!savedPost; // true if savedPost exists
      }
    }

    res.status(200).json({ ...post, isSaved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const { postData, postDetail } = req.body;
  const tokenUserId = req.userId;

  try { 
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
        postDetail: { create: postDetail },
      },
    });
    res.status(201).json(newPost); // 201 for resource creation
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};