import { Server, Socket } from "socket.io";
import { createSession, joinSession, getSession, removePlayer, deleteSession } from "../services/sessionService";

/**
 * Registers all session-related socket events
 */
export function registerSessionSockets(io: Server, socket: Socket) {
    /**
     * HOST creates new session
     */
    socket.on("create-session", () => {
        const session = createSession(socket.id);

        socket.emit("session-created", {
            roomCode: session.roomCode
        });
    });

    /**
     * PLAYER joins an existing session
     */
    socket.on("join-session", ({ roomCode }) => {
        console.log(roomCode);
        const result = joinSession(roomCode, socket.id);
        console.log("resu;t", result);
        if (!result) {
            socket.emit("join-session-error", "Invalid room code or socket ID");
            return;
        }

        // Notify the joiner only
        socket.emit("join-success");

        // Notify everyone in room (including host)
        io.to(roomCode).emit("player-joined", result.players);
    });

    /**
     * PLAYER leaves session
     */
    socket.on("leave-session", ({ roomCode }) => {
        const session = getSession(roomCode);
        if (!session) return;

        // Remove player
        removePlayer(socket.id);

        socket.leave(roomCode);

        // Notify remaining players
        io.to(roomCode).emit("player-left", session.players);
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
