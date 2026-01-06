import { Server, Socket } from "socket.io";
import { createSession, joinSession, getSession } from "../services/sessionService";
/**
 * Registers all session-related socket events
 */
export function registerSessionSockets(io: Server, socket: Socket) {
  /**
   * HOST creates a new session
   */
  socket.on("create-session", () => {
    // 1. Generate a session / room roomCode
    // 2. Store session state (host, players, etc.)
    // 3. Join the socket to the room
    // 4. Emit session-created back to host
  });

  /**
   * PLAYER joins an existing session
   */
  socket.on("join-session", (roomCode: string) => {
    // 1. Validate room exists
    // 2. Add player to session
    // 3. Join socket to room
    // 4. Notify host + players
  });

  /**
   * Handle disconnects
   */
  socket.on("disconnect", () => {
    // 1. Remove player from session
    // 2. If host disconnects, end session
    // 3. Notify remaining players
  });
}
