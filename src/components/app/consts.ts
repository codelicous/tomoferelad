export enum GameState {
    Create,
    InGame,
    Ended,
}

export const TURN_TIME = 20_000; // 20 seconds

export type PlayerColor = 'playerRed' | 'playerGreen' | 'playerBlue' | 'playerPink' | 'playerTeal';