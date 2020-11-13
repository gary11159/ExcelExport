import React from 'react';
import logo from './logo.svg';
import './App.css';
import Print from './components/print';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
      </header>
    </div>
  );
}

export default App;
