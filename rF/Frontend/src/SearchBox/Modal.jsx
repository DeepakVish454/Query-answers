import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #7676a7',
  boxShadow: 24,
  p: 4,
};

const QueryModal = ({ open, handleClose }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [queries, setQueries] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    setQueries([...queries, { title, description }]);
    handleClose();
    try {
      fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
    }
    catch (error) {
      console.log(error);
    }
  };



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Add Your Query</h2>
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden />
        </Button>
        <TextField fullWidth label="Title" margin="normal" onChange={handleTitleChange} />
        <TextField fullWidth label="Description" multiline rows={4} margin="normal" onChange={handleDescriptionChange} />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default QueryModal;
