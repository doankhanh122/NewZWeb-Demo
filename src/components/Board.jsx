import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import { moveTask } from "../store/tasksSlice";

const Board = () => {
  const columns = useSelector((state) => state.tasks.columns);
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const [fromColumnId, taskId] = active.id.split("-");
    const [toColumnId] = over.id.split("-");

    if (fromColumnId !== toColumnId) {
      dispatch(
        moveTask({
          fromColumnId,
          toColumnId,
          taskId: parseInt(taskId, 10),
        })
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {Object.values(columns).map((column) => (
          <SortableContext
            key={column.id}
            items={column.tasks.map((task) => `${column.id}-${task.id}`)}
            strategy={verticalListSortingStrategy}
          >
            <Column column={column} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
