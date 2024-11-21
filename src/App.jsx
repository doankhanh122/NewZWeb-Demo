import  
 store  from './store';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { Provider } from 'react-redux';
// import { Store  } from './store';
import Column from './components/Column';
import CreateTaskModal from './components/CreateTaskModal';
import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <DndContext>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <Column id="todo" title="To Do" />
          <div>
            <Column id="inProgress" title="In Progress" />
            <CreateTaskModal />
          </div>
          <Column id="done" title="Done" />
        </div>
      </DndContext>
    </Provider>
  );
};

export default App;
