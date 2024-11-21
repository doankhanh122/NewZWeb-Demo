

import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div style={{ padding: '10px', margin: '5px 0', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
      {task.title}
    </div>
  );
};

export default TaskCard;

