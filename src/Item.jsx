import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";

function SortableItem({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Style động để phản ánh trạng thái kéo thả
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#d1eaff" : "white", // Thay đổi màu nền khi kéo thả
    border: "1px solid #ccc",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "4px",
    cursor: "grab",
    boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // Thuộc tính cho khả năng kéo thả
      {...listeners} // Sự kiện kéo thả
    >
      <Card
      
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#607d8b" }}>
            
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#d1f0d1",
          color: "#4caf50",
          fontSize: "10px",
          textTransform: "uppercase",
          margin: "0 16px",
          borderRadius: 2,
        }}
      >
        Request Review
      </Button>
      <CardContent>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", color: "#757575" }}
        >
         
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          
        </Typography>
        <Typography variant="body2">
          <strong>TaskID:</strong> 
        </Typography>
        <Typography variant="body2">
          <strong>CARDID:</strong> 
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: 2 }}
        >
          <Tooltip title="Group">
            <IconButton>
              <GroupIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chat">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
    </div>
  );
}

export default SortableItem;
