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
        socket.emit("join-session", { roomCode });

        socket.once("join-session-error", console.error);

        socket.once("join-success", () => {
            navigate(`/session/${roomCode}`);
        });
    }

    return (
        <div style={{ padding: 40 }}>
        <h1>Session Game</h1>

        <button onClick={createSession}>Create Session</button>

        <hr />

        <input
        placeholder="Enter session roomCode"
        value={roomCode}
        onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={joinSession}>Join Session</button>
        </div>
    );
}