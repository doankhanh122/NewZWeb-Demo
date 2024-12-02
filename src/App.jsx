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


const handleAddItem = debounce(() => {
  setItems((prev) => {
    const updatedItems = { ...prev };
    const lastContainer =
      updatedItems.viecCuaToi[updatedItems.viecCuaToi.length - 1];

    const newItemId = `item_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    lastContainer.push(newItemId);

    return updatedItems;
  });

  setNewItemContent("");
}, 200); // Giới hạn sự kiện chỉ xảy ra mỗi 200ms


  function handleModalClose() {
    setShowModal(false);
    setNewItemContent('');
  }

  function handleSaveItem() {
    if (newItemContent.trim() === "") {
      return;
    }
  
    setItems((prev) => {
      const updatedItems = { ...prev };
  
      const lastContainer =
        updatedItems.viecCuaToi[updatedItems.viecCuaToi.length - 1];
  
      // Đảm bảo không có item trùng lặp
      if (lastContainer.includes(newItemContent)) {
        alert("Item đã tồn tại!");
        return prev;
      }
  
      lastContainer.push(
        `item_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`
      );
  
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
        
        <Column id="viecCuaToi" title="Việc Của Tôi" items={items.viecCuaToi}>
          {/* Thêm ô nhập và nút thêm item */}
          <div style={{ marginTop: "10px" }}>
            {/* <input
              type="text"
              value={newItemContent}
              // onChange={(e) => setNewItemContent(e.target.value)}
              placeholder="Nhập nội dung..."
            /> */}
            <button onClick={handleAddItem}>Thêm Item</button>
          </div>
        </Column>
        
        <Column id="xinYKien" title="Xin Ý Kiến" items={items.xinYKien} />
        
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}

