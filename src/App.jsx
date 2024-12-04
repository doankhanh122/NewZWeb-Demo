import React, { useState  } from "react";
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
      { id: "container1", title: "ANHLT_UAT", items: ["from TUNGLS_UAT - 2024-11-26 -  [Mặc định] Đã hoàn thành(Hoàn thành)", "from DUNGNTK_UAT - 2024-11-26 - [Mặc định] Đã hoàn thành(Hoàn thành)"] },
      { id: "container2", title: "DUNGNTK_UAT", items: ["from DUNGNTK_UAT - 2024-11-26 - [Mặc định] đã quá hạn ", "from TUNGLS_UAT - 2024-11-26 - [Mặc định] Đã hoàn thành(Hoàn thành)", "from DUNGNTK_UAT - 2024-11-26 - [Mặc định] Đã hoàn thành(Hoàn thành) "] },
      { id: "container3", title: "NHUNGPT_UAT", items: [] },
    ],
  },
  viecCuaToi: {
    title: "Việc Của Tôi",
    containers: [
      { id: "container4", title: "TODO", items: ["from      LONGNT_UAT - 2024-11-28 - [Xin nghỉ phép - Trưởng đơn vị] Sẵn sàng"] },
      { id: "container5", title: "INPROGRESS", items: [] },
      { id: "container6", title: "DONE", items: ["from   LONGNT_UAT - 2024-11-26 - [Xin nghỉ phép - Trưởng đơn vị] Đã hoàn thành(Hoàn thành)", "from TUNGLS_UAT - 2024-11-26 -      [Mặc định] Đã hoàn thành(Hoàn thành)"] },
    ],
  },
  xinYKien: {
    title: "Xin Ý Kiến",
    containers: [
      { id: "container7", title: "TỔNG GIÁM ĐỐC-TUNGLS_UAT", items: [] },
      { id: "container8", title: "TRƯỞNG PHÒNG PHÒNG TCNS&HCTH", items: ["from LONGNT_UAT - 2024-11-26 - [Xin nghỉ phép - Trưởng đơn vị] Đã hoàn thành(Hoàn thành)"] },
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
