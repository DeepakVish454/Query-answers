// index.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Collection from './mongooseConfig.js';  // Assuming this is your Mongoose model

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', async (req, res) => {
  try {
    const data = await Collection.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching data', error });
  }
});

app.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newData = new Collection({ title, description });
    await newData.save();
    res.send(newData);
  } catch (error) {
    res.status(500).send({ message: 'Error saving data', error });
  }
});

app.post('/reply', async (req, res) => {
  try {
    const { id, reply } = req.body;
    const post = await Collection.findById(id);
    if (post) {
      post.replies.push(reply);
      await post.save();
      res.send(post);
    } else {
      res.status(404).send({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error adding reply', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
