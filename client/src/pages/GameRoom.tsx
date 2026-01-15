import { useEffect, useState } from "react";
import socket from "../socket";

export default function GameRoom() {
  const [role, setRole] = useState<"CITIZEN" | "IMPOSTER" | null>(null);

  useEffect(() => {
    const handleAssignRole = ({ role }: { role: "CITIZEN" | "IMPOSTER" }) => {
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
            {role === "IMPOSTER" ? "AN IMPOSTER" : "A CITIZEN"}
          </h2>
        </div>
      )}
    </div>
  );
}
