import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Post from "./mongooseConfig.js"; 

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.get("/", async (req, res) => {
  try {
    const data = await Post.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching data", error });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new Post({ title, description });
    await newPost.save();
    res.send(newPost);
  } catch (error) {
    res.status(500).send({ message: "Error saving data", error });
  }
});

app.post("/reply", async (req, res) => {
  try {
    const { id, reply } = req.body;
    const post = await Post.findById(id);
    if (post) {
      post.replies.push({ text: reply });
      await post.save();
      res.send(post);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error adding reply", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});