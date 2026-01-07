import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";

export default function WaitingRoom() {
  const { roomCode } = useParams();
  const [playerCount, setPlayerCount] = useState(1);

  useEffect(() => {
    socket.on("session-update", ({ players }) => {
      setPlayerCount(players.length);
    });

    return () => {
      socket.off("session-update");
    };
  }, []);

  return (
    <div>
      <h2>Waiting Room</h2>
      <p>Room Code: <strong>{roomCode}</strong></p>
      <p>Players Connected: {playerCount}</p>

      <p>Waiting for host to start the game…</p>
    </div>
  );
}
