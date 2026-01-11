import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket";

export default function WaitingRoom() {
  const { roomCode } = useParams();
  const [playerCount, setPlayerCount] = useState(1);
  const [players, setPlayers] = useState<string[]>(['You']);
  const navigate = useNavigate();

  const leaveSession = () => {
    socket.emit("leave-session", { roomCode });
    navigate("/");
  };

  useEffect(() => {
    socket.on("session-update", ({ players: updatedPlayers }) => {
      setPlayerCount(updatedPlayers.length);
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off("session-update");
    };
  }, []);

  return (
    <div className="soft-card">
      <div className="kawaii-decoration">
        <h2 className="text-gradient">🎪 Waiting Room</h2>
      </div>
      
      {/* Room Code Display */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%)',
        padding: '1rem 2rem',
        borderRadius: 'var(--radius-xl)',
        margin: '2rem 0',
        display: 'inline-block'
      }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
          Room Code
        </div>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          letterSpacing: '0.5em',
          marginLeft: '0.5em',
          color: 'var(--text)',
          fontFamily: 'monospace'
        }}>
          {roomCode}
        </div>
      </div>

      {/* Player Count */}
      <div style={{ margin: '2rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="status-indicator status-waiting"></span>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>
            Players Connected: <strong style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{playerCount}</strong>
          </span>
        </div>

        {/* Player List */}
        <div style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginTop: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-light)', fontSize: '1rem' }}>
            👥 Players in Room
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {players.map((player, index) => (
              <div
                key={index}
                style={{
                  background: index === 0 
                    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)'
                    : 'var(--surface)',
                  color: index === 0 ? 'white' : 'var(--text)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  animation: index === 0 ? 'pulse 2s infinite' : 'none'
                }}
              >
                <span>{index === 0 ? '👑' : '👤'}</span>
                <span>{player}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div style={{
        background: 'var(--secondary-light)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        margin: '2rem 0',
        border: '2px dashed var(--secondary)'
      }}>
        <p style={{ 
          margin: 0, 
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⏳</span>
          Waiting for host to start the game…
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => {
            // Copy room code to clipboard
            navigator.clipboard.writeText(roomCode || '');
          }}
          style={{
            background: 'var(--surface)',
            color: 'var(--text)',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--primary-light)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary-light)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--surface)';
            e.currentTarget.style.color = 'var(--text)';
          }}
        >
          📋 Copy Code
        </button>
        
        <button
          onClick={leaveSession}
          style={{
            background: 'var(--surface)',
            color: 'var(--error)',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--error)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--error)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--surface)';
            e.currentTarget.style.color = 'var(--error)';
          }}
        >
          👋 Leave Game
        </button>
      </div>

      {/* Connection Status */}
      <div style={{ 
        marginTop: '2rem', 
        fontSize: '0.75rem',
        color: 'var(--text-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--success)',
          animation: 'pulse 2s infinite'
        }}></div>
        <span>Live updates enabled • Share code with friends to join</span>
      </div>
    </div>
  );
}