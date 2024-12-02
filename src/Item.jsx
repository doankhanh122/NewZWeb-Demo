import React from "react";
import { useSortable } from "@dnd-kit/sortable"; // Import hook useSortable để giúp quản lý việc kéo thả
import { CSS } from "@dnd-kit/utilities"; // Import CSS utility để giúp di chuyển item mượt mà

// Định nghĩa một component Item
export default function Item({ id }) {
  // Hook useSortable sẽ giúp chúng ta quản lý việc kéo thả cho item
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef} // setNodeRef sẽ gán element DOM của item vào ref
      {...attributes} // Lấy tất cả các attributes mà useSortable cung cấp
      {...listeners} // Lấy các listeners (chẳng hạn như onClick, onMouseDown) để item có thể kéo được
      style={{
        transform: CSS.Transform.toString(transform), // Áp dụng transform để item di chuyển khi kéo
        transition: transition || "transform 200ms ease", // Thêm transition để di chuyển mượt mà
        opacity: isDragging ? 0.5 : 1, // Giảm opacity khi item đang bị kéo
        padding: "10px",
        margin: "5px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      {id}
    </div>
  );
}
