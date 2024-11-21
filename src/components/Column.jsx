import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Card, CardContent, Typography, Button } from "@mui/material";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";

const Column = ({ column }) => {
  const { id, title, tasks, color } = column;
  const { setNodeRef } = useDroppable({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Card
      variant="outlined"
      style={{
        width: 300,
        backgroundColor: color,
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent ref={setNodeRef}>
        <Typography variant="h6" style={{ marginBottom: "16px", fontWeight: "bold" }}>
          {title}
        </Typography>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={id} />
        ))}
        <Button
          variant="contained"
          onClick={handleOpenModal}
          style={{
            marginTop: "16px",
            backgroundColor: "white",
            color: color,
            fontWeight: "bold",
          }}
        >
          +
        </Button>
        <CreateTaskModal open={isModalOpen} onClose={handleCloseModal} columnId={id} />
      </CardContent>
    </Card>
  );
};

export default Column;
