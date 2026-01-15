import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import type { Session } from "../../../shared/types/session";

export default function GameRoom() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomCode) return;

    socket.emit("get-session", roomCode);

    socket.on("session-updated", (players) => {
      setSession((prev) => prev ? { ...prev, players } : null);
      setLoading(false);
    });

    socket.on("session-ended", () => {
      setSession(null);
      setLoading(false);
    });

    return () => {
      socket.off("session-updated");
      socket.off("session-ended");
    };
  }, [roomCode]);

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>Session not found</div>;

  return (
    <div>
      <h1>Game Room: {roomCode}</h1>
      <p>Players: {session.players.length}</p>
    </div>
  );
}