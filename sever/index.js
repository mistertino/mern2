const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const cors = require('cors')

require('dotenv').config()
const app = express()
const PORT = 5000

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}k@mern-learnit.axwz2dl.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
      {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
      },
    )
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}
connectDB()

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))
