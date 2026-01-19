import { useEffect, useState } from "react";
import socket from "../socket";
import type { Role } from "../../../shared/types/role";

export default function GameRoom() {
  const [role, setRole] = useState<Role>(null);

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
    </div>
  );
}
