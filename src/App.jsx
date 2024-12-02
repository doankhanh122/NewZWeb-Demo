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

// Define defaultItems
const defaultItems = {
  giaoViec: [
    ["item1", "item2", "item3"],
    ["item4", "item5", "item6"],
    ["item7", "item8", "item9"],
  ],
  viecCuaToi: [
    ["item10", "item11", "item12"],
    ["item13", "item14", "item15"],
    ["item16", "item17", "item18"],
  ],
  xinYKien: [
    ["item19", "item20", "item21"],
    ["item22", "item23", "item24"],
    ["item25", "item26", "item27"],
  ],
};

const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

export default function App() {
  const [items, setItems] = useState(defaultItems);
  const [activeId, setActiveId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newItemContent, setNewItemContent] = useState('');
  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setItems((prev) => {
      const activeItems = [...prev[activeContainer]];
      const overItems = [...prev[overContainer]];

      const activeIndex = activeItems.findIndex((row) =>
        row.includes(activeId)
      );
      const overIndex = overItems.findIndex((row) =>
        row.includes(overId)
      );

      if (activeIndex !== -1) {
        const [movedItem] = activeItems[activeIndex].filter(
          (item) => item === activeId
        );

        activeItems[activeIndex] = activeItems[activeIndex].filter(
          (item) => item !== activeId
        );

        overItems[overIndex] = [...overItems[overIndex], movedItem];
      }

      return {
        ...prev,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    if (activeContainer === overContainer) {
      setItems((prev) => {
        const containerItems = [...prev[activeContainer]];
        const activeIndex = containerItems.findIndex((row) =>
          row.includes(activeId)
        );
        const overIndex = containerItems.findIndex((row) =>
          row.includes(overId)
        );

        if (activeIndex !== -1 && overIndex !== -1) {
          const movedItem = containerItems[activeIndex].filter(
            (item) => item === activeId
          )[0];

          containerItems[activeIndex] = containerItems[activeIndex].filter(
            (item) => item !== activeId
          );
          containerItems[overIndex] = [...containerItems[overIndex], movedItem];

          return {
            ...prev,
            [activeContainer]: containerItems,
          };
        }
        return prev;
      });
    } else {
      handleDragOver(event);
    }

    setActiveId(null);
  }

  function handleAddItem() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
    setNewItemContent('');
  }

  function handleSaveItem() {
    if (newItemContent.trim() === "") {
      return; // Không thêm item nếu nội dung rỗng
    }
  
    // Kiểm tra trùng lặp với item hiện có trong cột
    const itemExists = items.viecCuaToi.some((container) =>
      container.includes(newItemContent)
    );
    if (itemExists) {
      alert("Item đã tồn tại trong cột!");
      setNewItemContent("");
      return;
    }
  
    // Tạo ID duy nhất cho item mới
    const newItemId = `item_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems.viecCuaToi[updatedItems.viecCuaToi.length - 1].push(newItemId);
      return updatedItems;
    });
  
    setShowModal(false);
    setNewItemContent("");
  }
  

  function findContainer(id) {
    return Object.keys(items).find((key) =>
      items[key].some((row) => row.includes(id))
    );
  }

  return (
    <div style={wrapperStyle}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Column id="giaoViec" title="Giao Việc" items={items.giaoViec} />
        
        {/* Cột "Việc Của Tôi" có nút Thêm Item */}
        <Column id="viecCuaToi" title="Việc Của Tôi" items={items.viecCuaToi}>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={handleAddItem}>Thêm Item</button>
          </div>
        </Column>
        
        <Column id="xinYKien" title="Xin Ý Kiến" items={items.xinYKien} />
        
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>

      {/* Modal thêm item */}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Nhập nội dung item</h3>
            <input
              type="text"
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
            />
            <div>
              <button onClick={handleSaveItem}>Lưu</button>
              <button onClick={handleModalClose}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal style
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  textAlign: "center",
};
