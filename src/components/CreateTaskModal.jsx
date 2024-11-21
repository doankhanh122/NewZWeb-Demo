import React, { useState } from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateTaskModal = ({ open, onClose, columnId }) => {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(
        addTask({
          columnId,
          task: {
            id: Date.now(),
            title,
            label,
          },
        })
      );
      setTitle("");
      setLabel("");
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setLabel("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={modalStyle}>
        <h2>Tạo Task Mới</h2>
        <TextField
          label="Tiêu đề"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Nhãn"
          variant="outlined"
          fullWidth
          margin="normal"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end" style={{ marginTop: "16px" }}>
          <Button variant="outlined" onClick={handleCancel}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Tạo
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
