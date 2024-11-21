import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, Typography } from "@mui/material";

const TaskCard = ({ task, columnId }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${columnId}-${task.id}`,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="outlined"
      style={{
        ...style,
        marginBottom: "16px",
        backgroundColor: "white",
        color: "black",
        borderRadius: "8px",
        cursor: "grab",
      }}
    >
      <CardContent>
        <Typography variant="body1">{task.title}</Typography>
        {task.label && <Typography variant="body2">{task.label}</Typography>}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
