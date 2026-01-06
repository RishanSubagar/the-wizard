import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { registerSessionSockets } from "./sockets/session";

// --------------------
// App + Server Setup
// --------------------
const app = express();
const server = http.createServer(app);

// Allow frontend to connect
app.use(
    cors({
        origin: "http://localhost:5173", // The default address Vite uses
        methods: ["GET", "POST"],
    })
);

// --------------------
// Socket.IO Setup
// --------------------
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// --------------------
// Socket Connection
// --------------------
io.on("connection", (socket) => {
    console.log(`🕺 Client connected: ${socket.id}`);

    // Register all session-related socket events
    registerSessionSockets(io, socket);

    socket.on("disconnect", () => {
        console.log(`🏃‍♂️ Client disconnected: ${socket.id}`)
    });
});

// --------------------
// Start Server
// --------------------
const PORT = 3001;

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});