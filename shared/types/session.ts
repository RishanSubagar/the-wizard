import { Player } from "./player"

type Session = {
  roomCode: string;
  hostId: string;
  players: Player[];
  started: boolean;
};

export type { Session };