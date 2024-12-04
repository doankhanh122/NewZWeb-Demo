import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import Column from "./Column"; // Import Column component
import Item from "./Item"; // Import Item component
import debounce from "lodash.debounce"; // Cài đặt bằng: npm install lodash.debounce

// Cấu trúc items mặc định
const defaultItems = {
  giaoViec: {
    title: "Giao Việc",
    containers: [
      { id: "container1", items: ["item1", "item2", "item3"] },
      { id: "container2", items: ["item4", "item5", "item6"] },
      { id: "container3", items: ["item7", "item8", "item9"] },
    ],
  },
  viecCuaToi: {
    title: "Việc Của Tôi",
    containers: [
      { id: "container4", items: ["item10", "item11", "item12"] },
      { id: "container5", items: ["item13", "item14", "item15"] },
      { id: "container6", items: ["item16", "item17", "item18"] },
    ],
  },
  xinYKien: {
    title: "Xin Ý Kiến",
    containers: [
      { id: "container7", items: ["item19", "item20", "item21"] },
      { id: "container8", items: ["item22", "item23", "item24"] },
      { id: "container9", items: ["item25", "item26", "item27"] },
    ],
  },
};

const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

export default function App() {
  const [items, setItems] = useState(defaultItems);
  const [activeId, setActiveId] = useState(null);
  const [containers, setContainers] = useState(defaultItems);

  const sensors = useSensors(useSensor(PointerSensor));

  // Tìm container chứa một item theo ID
  const findContainer = (id) => {
    for (const [key, data] of Object.entries(items)) {
      for (const container of data.containers) {
        if (container.items.includes(id)) {
          return { key, container };
        }
      }
    }
    return null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = findContainer(active.id);
    const overData = findContainer(over.id);

    if (!activeData || !overData) return;

    if (activeData.container.id !== overData.container.id) {
      setItems((prev) => {
        const updated = { ...prev };

        // Loại bỏ item từ container ban đầu
        const activeItems = activeData.container.items.filter(
          (item) => item !== active.id
        );

        // Thêm item vào container mới
        const overItems = [...overData.container.items, active.id];

        updated[activeData.key].containers = updated[activeData.key].containers.map(
          (container) =>
            container.id === activeData.container.id
              ? { ...container, items: activeItems }
              : container
        );

        updated[overData.key].containers = updated[overData.key].containers.map(
          (container) =>
            container.id === overData.container.id
              ? { ...container, items: overItems }
              : container
        );

        return updated;
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!active || !over) return;
  
    const activeContainerId = active.data.current.sortable.containerId;
    const overContainerId = over.id;
  
    if (activeContainerId !== overContainerId) {
      setItems((prev) => {
        // Tìm nhóm chứa `activeContainerId` và `overContainerId`
        let activeGroupKey, overGroupKey;
        Object.entries(prev).forEach(([groupKey, group]) => {
          group.containers.forEach((container) => {
            if (container.id === activeContainerId) activeGroupKey = groupKey;
            if (container.id === overContainerId) overGroupKey = groupKey;
          });
        });
  
        if (!activeGroupKey || !overGroupKey) return prev;
  
        // Lấy container tương ứng
        const activeGroup = prev[activeGroupKey];
        const overGroup = prev[overGroupKey];
        const activeContainer = activeGroup.containers.find(
          (container) => container.id === activeContainerId
        );
        const overContainer = overGroup.containers.find(
          (container) => container.id === overContainerId
        );
  
        if (!activeContainer || !overContainer) return prev;
  
        // Di chuyển item
        const itemIndex = activeContainer.items.indexOf(active.id);
        if (itemIndex === -1) return prev;
  
        const [movedItem] = activeContainer.items.splice(itemIndex, 1);
        overContainer.items.push(movedItem);
  
        // Trả về trạng thái mới
        return {
          ...prev,
          [activeGroupKey]: {
            ...activeGroup,
            containers: [...activeGroup.containers],
          },
          [overGroupKey]: {
            ...overGroup,
            containers: [...overGroup.containers],
          },
        };
      });
    }
  };
  
  const handleAddItem = (containerId) => {
    setItems((prev) => {
      const updatedItems = { ...prev };
  
      // Tìm container trong cột "Việc Của Tôi"
      const targetContainer = updatedItems.viecCuaToi.containers.find(
        (container) => container.id === containerId
      );
  
      if (!targetContainer) return prev;
  
      // Tạo item mới với ID duy nhất
      const newItemId = `item_${Date.now()}`;
  
      // Thêm item mới vào container
      targetContainer.items.push(newItemId);
  
      return updatedItems;
    });
  };
  
  return (
    <div style={wrapperStyle}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.entries(items).map(([key, data]) => (
          <Column
            key={key}
            id={key}
            title={data.title}
            containers={data.containers}
          >
            {key === "viecCuaToi" &&
  data.containers.map((container, index) => (
    <div key={container.id} style={{ margin: "10px 0" }}>
      {/* Hiển thị nút Add Item chỉ ở container cuối cùng */}
      {index === data.containers.length - 1 && (
        <button onClick={() => handleAddItem(container.id)}>
          + 
        </button>
      )}
    </div>
  ))}

          </Column>
        ))}
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
  
}
