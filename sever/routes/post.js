const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

// @route POST api/posts
// @desc Create post
// @acess Private

router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body

  //Simple Validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' })

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://') ? url : `https://${url}`,
      status: status || 'TO LEARN',
      user: req.userId,
    })

    await newPost.save()
    res.json({ success: true, message: 'Post created', post: newPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// @route GET api/posts
// @desc Get post
// @acess Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ])
    res.json({ success: true, posts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// @route PUT api/posts
// @desc Update post
// @acess Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body

  //Simple Validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' })

  try {
    let updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO_LEARN',
    }

    const postUpdateCondition = { _id: req.params.id, user: req.userId }

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true },
    )

    // User not authorised to update post
    if (!updatedPost)
      res.status(401).json({
        success: false,
        message: 'Post not found or user not authorised',
      })
    res.json({ success: true, message: 'Post updated', post: updatedPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// @route DELETE api/posts
// @desc delete post
// @acess Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { id: req.params.id, user: req.userId }
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition)
    // User not authorised to update post
    if (!deletedPost)
      res.status(401).json({
        success: false,
        message: 'Post not found or user not authorised',
      })
    res.json({ success: true, message: 'Post deleted', post: deletedPost })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})
module.exports = router
