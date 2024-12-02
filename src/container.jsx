import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./Item"; // Assuming you have a SortableItem component

const Container = ({ containerId, items }) => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        minHeight: "50px", // To ensure visibility even when empty
      }}
    >
      <SortableContext items={items} id={containerId}>
        {items.length > 0 ? (
          items.map((item) => <SortableItem key={item} id={item} />)
        ) : (
          <div style={{ color: "#888", textAlign: "center" }}>
            No items to display
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default Container;
