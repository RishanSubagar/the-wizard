import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Home() {
    const [roomCode, setCode] = useState<string>("");
    const navigate = useNavigate();

    const createSession = () => {
        socket.emit("create-session");

        socket.once("session-created", ({ roomCode }: { roomCode: string}) => {
            navigate(`/session/${roomCode}`);
        });
    };

    const joinSession = () => {
        if (!roomCode.trim()) {
            return;
        }
        
        socket.emit("join-session", { roomCode });

        socket.once("join-session-error", console.error);

        socket.once("join-success", () => {
            navigate(`/session/${roomCode}`);
        });
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            joinSession();
        }
    };

    return (
        <div className="soft-card kawaii-decoration">
            <h1 className="text-gradient">🎮 Session Game</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Create or join a game session with friends
            </p>

            {/* Create Session Button */}
            <button
                onClick={createSession}
                style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1.1rem',
                    width: '100%',
                    marginBottom: '2rem',
                    boxShadow: 'var(--shadow-md)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
            >
                ✨ Create New Session
            </button>

            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                margin: '2rem 0',
                color: 'var(--text-light)'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--primary-light)' }}></div>
                <span style={{ padding: '0 1rem' }}>or join with code</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--primary-light)' }}></div>
            </div>

            {/* Join Session Section */}
            <div style={{ 
                background: 'var(--background)', 
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem'
            }}>
                <input
                    placeholder="Enter session code"
                    value={roomCode}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--primary-light)',
                        background: 'var(--surface)',
                        color: 'var(--text)',
                        fontSize: '1rem',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        transition: 'border-color var(--transition-fast)'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.outline = 'none';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'var(--primary-light)';
                    }}
                />
                
                <button
                    onClick={joinSession}
                    disabled={!roomCode.trim()}
                    style={{
                        background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
                        color: 'white',
                        padding: '0.875rem 1.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        width: '100%',
                        opacity: roomCode.trim() ? 1 : 0.6,
                        cursor: roomCode.trim() ? 'pointer' : 'not-allowed'
                    }}
                    onMouseEnter={(e) => {
                        if (roomCode.trim()) {
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    🎯 Join Session
                </button>
            </div>

            <div style={{ 
                marginTop: '2rem', 
                fontSize: '0.875rem',
                color: 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
            }}>
                <span className="status-indicator status-online"></span>
                <span>Connected to server</span>
            </div>
        </div>
    );
}