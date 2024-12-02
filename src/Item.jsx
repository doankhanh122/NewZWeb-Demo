import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      {id}
    </div>
  );
}

export default SortableItem;
