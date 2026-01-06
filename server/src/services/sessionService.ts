import type { Session } from "../types/session.js";

// In-memory store
const sessions = new Map<string, Session>();

// Create session
export function createSession(socketId: string): Session {
  const roomCode = createRoomCode(5);
  const newSession = {
    roomCode: roomCode,
    hostId: socketId,
    players: [socketId]
  }
  sessions.set(roomCode, newSession);
  return newSession
}

// Join session
export function joinSession(roomCode: string, socketId: string): Session | undefined {
  if (!roomCode || !socketId) {
    return undefined;
  }
 const session = sessions.get(roomCode);
  if (!session) {
    return undefined;
  }
  session.players.push(socketId);
  return session
}

// Get session
export function getSession(roomCode: string): Session | undefined {
  return sessions.get(roomCode)
}

// Helper function
function createRoomCode(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}