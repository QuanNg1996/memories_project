import PostMessage from '../models/postMessage.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getPosts = async (_, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error)
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndDelete(_id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

  res.json(updatedPost);
};

export const dislikePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { dislikeCount: post.dislikeCount + 1 }, { new: true });

  res.json(updatedPost);
};

export default router;