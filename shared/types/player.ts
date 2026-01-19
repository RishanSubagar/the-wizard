import type { Role } from "./role"

type Player = {
    socketId: string;
    role?: Role;
};

export type { Player };