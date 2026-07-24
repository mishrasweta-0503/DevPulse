const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

//connect database
connectDb();

app.get('/api/health',(req,res) => {
    res.json({status : 'ok', message : 'DevPulse API Server Ready'})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`)
})