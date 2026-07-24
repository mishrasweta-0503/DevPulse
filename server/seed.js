const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Post.deleteMany();

    // Create a demo author
    const hashedPassword = await bcrypt.hash('password123', 10);
    const demoUser = await User.create({
      username: 'alex_dev',
      email: 'alex@devpulse.io',
      password: hashedPassword,
    });

    // Sample posts
    const samplePosts = [
      {
        title: 'Why React 19 Actions are a Game Changer',
        content: 'React 19 simplifies form handling by integrating Actions directly with server state...',
        tags: ['react', 'frontend', 'javascript'],
        author: demoUser._id,
      },
      {
        title: 'Building Scalable APIs with Express and MongoDB',
        content: 'When designing RESTful APIs, proper indexing and query population make a huge difference in performance...',
        tags: ['node', 'express', 'mongodb', 'backend'],
        author: demoUser._id,
      },
    ];

    await Post.insertMany(samplePosts);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedData();