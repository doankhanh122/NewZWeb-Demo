import React from "react";
import { Provider } from "react-redux";
import  store  from "./store";
import Board from "./components/Board";

function App() {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: "#3B4CA9", minHeight: "100vh", padding: "20px" }}>
        <Board />
      </div>
    </Provider>
  );
}

export default App;
