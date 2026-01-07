import type { Session } from "../types/session";

// In-memory store
const sessions = new Map<string, Session>();

export function createSession(socketId: string): Session {
    const roomCode = createRoomCode(5);
    const newSession = {
        roomCode: roomCode,
        hostId: socketId,
        players: [socketId]
    }
    sessions.set(roomCode, newSession);
    console.log(newSession)
    return newSession
}

export function joinSession(roomCode: string, socketId: string): Session | undefined {
    if (!roomCode || !socketId) {
        return undefined;
    }
    const session = sessions.get(roomCode);
    if (!session) {
        return undefined;
    }
    if (!session.players.includes(socketId)) {
        const updatedSession = addPlayerToSession(session, socketId);
        sessions.set(roomCode, updatedSession);  // Replace session instead of mutate
    }
    return session
}

export function getSession(roomCode: string): Session | undefined {
    return sessions.get(roomCode)
}

export function removePlayer(socketId: string) {
  // Find session containing player
    for (const [roomCode, session] of sessions.entries()) {
    if (session.players.includes(socketId)) {
        const updatedSession = removePlayerFromSession(session, socketId);  // Remove player

        // Handle host disconnect
        if (session.hostId === socketId) {
            sessions.delete(roomCode);
            return roomCode  // Return room code so host disconnect can be handled
        } else {
            sessions.set(roomCode, updatedSession);  // Update session
        }
        return
    }
  }
}

export function deleteSession(roomCode: string) {
    sessions.delete(roomCode);
}

// Add player helper
function addPlayerToSession(session: Session, socketId: string): Session {
    return {
        ...session,
        players: [...session.players, socketId],
    };
}

// Remove player helper
function removePlayerFromSession(session: Session, socketId: string) {
    return {
        ...session,
        players: session.players.filter(id => id !== socketId),
    };
}

// TODO: make sure collision does not occur
// Code creation function
function createRoomCode(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}