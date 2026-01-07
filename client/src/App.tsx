import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session/:roomCode" element={<WaitingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}