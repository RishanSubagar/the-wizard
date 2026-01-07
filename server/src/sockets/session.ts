import { Server, Socket } from "socket.io";
import { createSession, joinSession, getSession, removePlayer } from "../services/sessionService.js";

/**
 * Registers all session-related socket events
 */
export function registerSessionSockets(io: Server, socket: Socket) {
    //HOST creates a new session
    socket.on("create-session", () => {
        const session = createSession(socket.id);
    });

    /**
     * PLAYER joins an existing session
     */
    socket.on("join-session", (roomCode: string) => {
        const result = joinSession(roomCode, socket.id);
        if (!result) {
            socket.emit("join-session-error", "Invalid room code or socket ID");
            return;
        }
        socket.join(roomCode);
        io.to(roomCode).emit("player-joined", result.players);
    });

    /**
     * Handle disconnects
     */
    socket.on("disconnect", () => {
        const roomCode = removePlayer(socket.id);
        if (roomCode) {
            io.to(roomCode).disconnectSockets();
        }
    });
}
