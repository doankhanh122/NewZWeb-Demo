import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSubcard } from '../store/tasksSlice';

const AddSubCard = ({ onAddSubCard, onCancel }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content) {
      onAddSubCard(content);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập nội dung task"
        rows="4"
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Thêm
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default AddSubCard;
