import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { moveTask } from './store/tasksSlice';
import Column from './components/Column';

const App = () => {
  const columns = useSelector((state) => state.tasks.columns);
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const sourceColumnId = Object.keys(columns).find((id) =>
      columns[id].tasks.includes(active.id)
    );
    const targetColumnId = over.id;

    if (sourceColumnId && targetColumnId && sourceColumnId !== targetColumnId) {
      dispatch(
        moveTask({
          taskId: active.id,
          sourceColumnId,
          targetColumnId,
        })
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
        {Object.keys(columns).map((columnId) => (
          <Column key={columnId} columnId={columnId} />
        ))}
      </div>
    </DndContext>
  );
};

export default App;
