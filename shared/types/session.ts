import { Player } from "./player"
import { GameMode } from "./gameMode"

type Session = {
  roomCode: string;
  hostId: string;
  players: Player[];
  started: boolean;
  mode: GameMode;
};

export type { Session };