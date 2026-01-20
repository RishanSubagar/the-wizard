import { useEffect, useState } from "react";
import socket from "../socket";
import type { Role } from "../../../shared/types/role";
import type { GameMode } from "../../../shared/types/gameMode"
import { useParams } from "react-router-dom";

export default function GameRoom() {
  const { roomCode } = useParams();
  const [role, setRole] = useState<Role>(null);

  const chooseMode = (mode: GameMode) => {
    if (!roomCode) return;

    socket.emit("select-game-mode", {
      roomCode,
      mode,
    });
  };

  useEffect(() => {
    const handleAssignRole = ({ role }: { role: Role }) => {
      console.log("Role received:", role);
      setRole(role);
    };

    socket.on("assign-role", handleAssignRole);

    return () => {
      socket.off("assign-role", handleAssignRole);
    };
  }, []);

  return (
    <div className="game-screen">
      {role === null ? (
        <h2>Preparing your role...</h2>
      ) : (
        <div className="role-reveal">
          <h1>YOU ARE...</h1>
          <h2 className={`role ${role.toLowerCase()}`}>
            {role === "imposter" ? "AN IMPOSTER" : "A CITIZEN"}
          </h2>
        </div>
      )}

      <button onClick={() => chooseMode("quick")}>⚡ Quick Play</button>
      <button onClick={() => chooseMode("online")}>🌐 Online Play</button>
    </div>
  );
}
