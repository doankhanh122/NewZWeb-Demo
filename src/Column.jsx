import React from "react";
import DroppableContainer from "./container"; // Import DroppableContainer component

export default function Column({ id, title, containers = [], children }) {
  // Validation for props
  if (!Array.isArray(containers)) {
    console.error("Invalid containers prop:", containers);
    return null; // Fallback in case of invalid data
  }

  return (
    <div
      style={{
        width: "300px",
        padding: "10px",
        backgroundColor: "#f1f1f1",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginRight: "10px",
      }}
    >
      {/* Render Column Title */}
      <h3 style={{ textAlign: "center" }}>{title}</h3>

      {/* Render Containers */}
      {containers.length > 0 ? (
        containers.map((container, containerIndex) => (
          <DroppableContainer
            key={containerIndex}
            containerId={container.id || `container-${containerIndex}`}
            items={container.items || []}
            title={container.title || `Untitled Container ${containerIndex + 1}`}
          />
        ))
      ) : (
        <div style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
          No containers available
        </div>
      )}

      {/* Render children if any */}
      {children && <div style={{ marginTop: "10px" }}>{children}</div>}
    </div>
  );
}
