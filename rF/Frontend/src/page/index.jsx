import React from "react";
import Post from "./Post";
import Button from "@mui/material/Button";
import QueryModal from "./Modal";

import "./style.scss";

function Index() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="post-create-functions">
        <div className="post-button">
          <Button
            variant="contained"
            sx={{
              height: "30px",
              width: "250px",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "blue",
              "&:hover": {
                backgroundColor: "lightblue",
                color: "blue",
              },
            }}
            onClick={handleModalOpen}
          >
            Add your Query
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "30px",
              width: "250px",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#7676a7",
              opacity: "0.8",
              backgroundColor: "#fff",
              border: "1px solid #7676a7",
              "&:hover": {
                backgroundColor: "#7676a7",
                color: "#fff",
              },
            }}
          >
            Report
          </Button>
        </div>
      </div>
      <div className="post-main">
        <Post />
      </div>

      <QueryModal open={modalOpen} handleClose={handleModalClose} />
    </div>
  );
}

export default Index;
