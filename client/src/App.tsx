import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import "./App.css";

// Layout wrapper for consistent styling
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--background) 0%, #f5f0ff 100%)',
      padding: '20px'
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}