import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import GameRoom from "./pages/GameRoom";
import "./App.css";

// Layout wrapper for consistent styling
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--background) 0%, #f5f0ff 100%)',
      paddingTop: "30px"
    }}>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session/:roomCode" element={<WaitingRoom />} />
          <Route path="/game/:roomCode" element={<GameRoom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}