import React from 'react';
import SortVisualizer from './SortVisualizer';
import "./assets/styles/Dashboard.scss"


function Dashboard(){
  return (
    <div className="Dashboard">
        <h1>Welcome to AlgorithmVisualizer</h1>
        <SortVisualizer/>
    </div>
  );
}

export default Dashboard;
