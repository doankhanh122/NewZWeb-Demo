import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import Item from "./Item"; // Giả sử bạn đã có component Item

const Container = ({ containerId, items }) => {
  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <SortableContext items={items} >
        {/* Lặp qua các item trong container và render chúng */}
        {items.map((item) => (
          <Item key={item} id={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Container;
