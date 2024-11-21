import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import CreateTaskModal from './CreateTaskModal'; // Import CreateTaskModal
import TaskCard from './TaskCard';

const Column = ({ id, title }) => {
  const { setNodeRef } = useDroppable({ id });
  const tasks = useSelector((state) => state.tasks.columns[id]);
  
  // State để điều khiển hiển thị modal
  const [openModal, setOpenModal] = useState(false);

  // Mở modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div ref={setNodeRef} style={{ padding: '20px', width: '30%', border: '1px solid #ccc' }}>
      <h3>{title}</h3>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      
      {/* Nút để mở CreateTaskModal */}
      <button onClick={handleOpenModal}>Create Task</button>
      
      {/* Hiển thị modal khi openModal là true */}
      <CreateTaskModal open={openModal} handleClose={handleCloseModal} columnId={id} />
    </div>
  );
};

export default Column;
