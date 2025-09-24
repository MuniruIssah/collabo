import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Room from "./pages/CodeRoom";
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
