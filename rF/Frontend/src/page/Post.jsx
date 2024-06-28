
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddReply = async (postId, replyText, setReplyText) => {
    try {
      const response = await fetch('http://localhost:3000/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId, reply: replyText }),
      });
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleUpVote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          if (post.hasDownVoted) {
            post.downVotes -= 1;
            post.hasDownVoted = false;
          }
          if (!post.hasUpVoted) {
            post.upVotes += 1;
            post.hasUpVoted = true;
          } else {
            post.upVotes -= 1;
            post.hasUpVoted = false;
          }
        }
        return post;
      })
    );
  };

  const handleDownVote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          if (post.hasUpVoted) {
            post.upVotes -= 1;
            post.hasUpVoted = false;
          }
          if (!post.hasDownVoted) {
            post.downVotes += 1;
            post.hasDownVoted = true;
          } else {
            post.downVotes -= 1;
            post.hasDownVoted = false;
          }
        }
        return post;
      })
    );
  };

  const handleToggleReplies = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          post.showReplies = !post.showReplies;
        }
        return post;
      })
    );
  };

  return (
    <div className="post-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="buttons">
              <Button
                variant="contained"
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "blue",
                  marginRight: "10px",
                  "&:hover": {
                    backgroundColor: "lightblue",
                    color: "blue",
                  },
                }}
                onClick={() => handleUpVote(post._id)}
              >
                Up Vote ({post.upVotes || 0})
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "blue",
                  marginRight: "10px",
                  "&:hover": {
                    backgroundColor: "lightblue",
                    color: "blue",
                  },
                }}
                onClick={() => handleDownVote(post._id)}
              >
                Down Vote ({post.downVotes || 0})
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "blue",
                  margin: "0 10px",
                  "&:hover": {
                    backgroundColor: "lightblue",
                    color: "blue",
                  },
                }}
                onClick={() => handleToggleReplies(post._id)}
              >
                {post.showReplies ? "Hide Replies" : "Show Replies"}
              </Button>
            </div>
            {post.showReplies && (
              <div className="replies">
                {post.replies && post.replies.length > 0 ? (
                  post.replies.map((reply, index) => (
                    <p key={index}>{reply.text}</p>
                  ))
                ) : (
                  <p>No replies yet.</p>
                )}
                <ReplyInput postId={post._id} onAddReply={handleAddReply} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}

const ReplyInput = ({ postId, onAddReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  return (
    <div className="reply-input">
      <TextField
        name="replyText"
        value={replyText}
        onChange={handleReplyChange}
        label="Message"
        variant="outlined"
        size="small"
        sx={{ marginRight: "10px", width: "60%" }}
      />
      <Button
        variant="contained"
        onClick={() => onAddReply(postId, replyText, setReplyText)}
        sx={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "blue",
          "&:hover": {
            backgroundColor: "lightblue",
            color: "blue",
          },
        }}
      >
        Send
      </Button>
    </div>
  );
};