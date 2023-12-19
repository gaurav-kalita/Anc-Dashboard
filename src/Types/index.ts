export interface Player {
  name: string;
  age: number;
}

export interface Team {
  team_name: string;
  players: Player[];
}

export interface Game {
  game: string;
  teams: Team[];
}

export type SportsData = Game[];
