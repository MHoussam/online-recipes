// import './styles/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        {/* <Route path="/Feeds" element={<Feeds />} /> */}
        {/* <Route path='*' element={<h1>404</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;