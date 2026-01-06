import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Home() {
    const [code, setCode] = useState<string>("");
    const navigate = useNavigate();

    const createSession = () => {
        socket.emit("create-session");

        socket.once("session-created", ({ code }: { code: string}) => {
            navigate(`/session/${code}`);
        });
    };

    const joinSession = () => {
        socket.emit("join-session", { code });
        navigate(`/session/${code}`);
    }

    return (
        <div style={{ padding: 40 }}>
        <h1>Session Game</h1>

        <button onClick={createSession}>Create Session</button>

        <hr />

        <input
        placeholder="Enter session code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
        <button onClick={joinSession}>Join Session</button>
        </div>
    );
}