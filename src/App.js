import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import MainDashboard from './components/MainDashboard';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="app-container">
        <MainDashboard />
      </div>
    </ExpenseProvider>
  );
}

export default App;