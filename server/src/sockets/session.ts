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

        // Join socket
        socket.join(session.roomCode); 

        // Emit messages to UI
        socket.emit("session-created", {
            roomCode: session.roomCode
        });
        socket.emit("session-updated", session.players)
    });

    /**
     * PLAYER joins an existing session
     */
    socket.on("join-session", ({ roomCode }) => {
        const result = joinSession(roomCode, socket.id);
        console.log("Session trying to join:", result);
        if (!result) {
            socket.emit("join-session-error", "Invalid room code or socket ID");
            return;
        }

        // Notify the joiner only
        socket.emit("join-success");

        // Notify everyone in room (including host)
        io.to(roomCode).emit("session-updated", result.players);
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
        io.to(roomCode).emit("session-updated", session.players);
    });

    /**
     * Handle refreshes / reconnects
     */
    socket.on("get-session", (roomCode: string) => {
        const session = getSession(roomCode);
        if (!session) {
            socket.emit("session-ended");
            return;
        }

        // Sync full state on page load
        socket.emit("session-updated", session.players);
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

    socket.on("start-game", (roomCode: string) => {
        const session = getSession(roomCode);
        if (!session) return;

        // Host check
        if (session.hostId !== socket.id) {
            socket.emit("start-game-error", "Only host can start the game.");
            return;
        }

        io.to(roomCode).emit("game-started");
    })
}
