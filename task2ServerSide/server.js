const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://mr_fahad_rajput:whETr8kX@cluster0.y20to.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for the "Post" collection
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// Route for displaying paginated posts
app.get('/posts/:page', async (req, res) => {
  const page = req.params.page || 1;
  const perPage = 10;
  const posts = await Post.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});