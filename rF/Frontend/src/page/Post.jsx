import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Post() {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [upVotes, setUpVotes] = useState(Math.floor(Math.random() * 100));
  const [downVotes, setDownVotes] = useState(Math.floor(Math.random() * 100));
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
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

  const handleAddReply = async (postId) => {
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

  const handleToggleReplies = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies);
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleUpVote = () => {
    if (hasDownVoted) {
      setDownVotes((prevDownVotes) => prevDownVotes - 1);
      setHasDownVoted(false);
    }
    if (!hasUpVoted) {
      setUpVotes((prevUpVotes) => prevUpVotes + 1);
      setHasUpVoted(true);
    } else {
      setUpVotes((prevUpVotes) => prevUpVotes - 1);
      setHasUpVoted(false);
    }
  };

  const handleDownVote = () => {
    if (hasUpVoted) {
      setUpVotes((prevUpVotes) => prevUpVotes - 1);
      setHasUpVoted(false);
    }
    if (!hasDownVoted) {
      setDownVotes((prevDownVotes) => prevDownVotes + 1);
      setHasDownVoted(true);
    } else {
      setDownVotes((prevDownVotes) => prevDownVotes - 1);
      setHasDownVoted(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>

<div className="post">
        <div className="post-image">
          <img src="https://www.w3schools.com/w3images/lights.jpg" alt="post" />
        </div>
        <div className="post-content">
          <h3>Post Title</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
            voluptatibus nisi distinctio, non quisquam quia, voluptatem atque
            eveniet praesentium labore excepturi enim deleniti in error numquam
            veniam quaerat consequuntur. Rem similique perspiciatis suscipit.
            Natus qui perferendis optio quos iste necessitatibus unde id vitae
            amet, officiis praesentium reprehenderit! At debitis obcaecati
            quaerat nemo recusandae accusamus enim nobis.
          </p>
        </div>
        <div className="buttons">
          <div className="apply-buttons">
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
              onClick={handleUpVote}
            >
              Up Vote ({upVotes})
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
              onClick={handleDownVote}
            >
              Down Vote ({downVotes})
            </Button>
          </div>
          <div className="reply-button">
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
              onClick={handleToggleReplies}
            >
              {showReplies ? "Hide Replies" : "Show Replies"}
            </Button>
          </div>
        </div>
        {showReplies && (
          <div className="replies">
            {replies.map((reply, index) => (
              <p key={index}>{reply}</p>
            ))}
            <div className="reply-input">
              <TextField
                value={replyText}
                onChange={handleReplyChange}
                label="Message"
                variant="outlined"
                size="small"
                sx={{ marginRight: "10px", width: "60%" }}
              />
              <Button
                variant="contained"
                onClick={handleAddReply}
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
          </div>
        )}
      </div>

    <div className="post-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="replies">
              {post.replies && post.replies.length > 0 ? (
                post.replies.map((reply, index) => (
                  <p key={index}>{reply}</p>
                ))
              ) : (
                <p>No replies yet.</p>
              )}
              <div className="reply-input">
                <TextField
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  label="Message"
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: "10px", width: "60%" }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleAddReply(post._id)}
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
            </div>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
    </>
  );
}
