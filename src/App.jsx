import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div>
        <Header />
      </div>
      <div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
