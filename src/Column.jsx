import React from "react";
import Container from "./container"; // Import Container component

export default function Column({ id, title, items, children }) {
  return (
    <div style={{ width: "300px" }}>
      <h3>{title}</h3>
      {items.map((containerItems, containerIndex) => (
        <Container key={containerIndex} id={id} index={containerIndex} items={containerItems} />
      ))}
      {children} {/* Display children here (e.g., the "Thêm Item" button) */}
    </div>
  );
}
