export enum GameState {
    Create,
    InGame,
    Ended,
}

export const TURN_TIME = 40_000;
export const GAME_TIME = 5 * 60_000; // 5 minute

export const PlayerColorBank = {
    player1: 'amber-400',
    player2:  'red-500',
    player3:  'lime-500',
    player4:  'fuchsia-600',
    player5:  'violet-500',
} as const;