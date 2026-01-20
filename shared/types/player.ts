import type { Role } from "./role"
import type { PlayerStats } from "./playerStats"

type Player = {
    socketId: string;
    role?: Role;
    stats: PlayerStats;
};

export type { Player };