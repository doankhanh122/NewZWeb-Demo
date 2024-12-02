import React from "react";
import Container from "./container"; // Import Container component

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
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      {containers.length > 0 ? (
        containers.map((container, containerIndex) => (
          <Container
            key={containerIndex}
            containerId={container.id || `container-${containerIndex}`}
            items={container.items || []}
          />
        ))
      ) : (
        <div style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
          No containers available
        </div>
      )}
      {children && <div style={{ marginTop: "10px" }}>{children}</div>}
    </div>
  );
}
