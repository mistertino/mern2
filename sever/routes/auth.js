const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @ access public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user)
      return res.status(400).json({ success: false, message: 'User not found' })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// @route POST api/auth/register
// @desc Register User
// @acess Public

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing Username or Password' })

  try {
    // Check for existing user
    const user = await User.findOne({ username })
    if (user)
      return res.status(400).json({ success: false, message: 'User already' })

    // All good
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()
    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
    )

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})

// @route POST api/auth/login
// @desc Login User
// @acess Public

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing Username or Password' })

  try {
    // Check for existing user
    const user = await User.findOne({ username })
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect user or password' })

    // username found
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect user or password' })

    // All good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
    )
    res.json({
      success: true,
      message: 'User logged successfully',
      accessToken,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error })
  }
})
module.exports = router
