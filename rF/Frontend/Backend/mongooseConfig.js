import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.log('Error connecting to MongoDB');
  });

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  replies: [replySchema],
});

const Post = mongoose.model('Post', postSchema);

export default Post;