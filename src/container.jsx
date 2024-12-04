import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./Item";

const DroppableContainer = ({ containerId, items }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: containerId,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? "#e0f7fa" : "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        minHeight: "50px",
      }}
    >
      <SortableContext items={items} id={containerId}>
        {items.length > 0 ? (
          items.map((item) => <SortableItem key={item} id={item} />)
        ) : (
          <div style={{ textAlign: "center", color: "#999" }}>
            Drag items here
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default DroppableContainer;
