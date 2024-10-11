import {GameState} from './app/consts';
declare global {
    export interface Player {
        id: string;
        name: string;
        color: string;
    }

    export interface Game {
        name?: string;
        id?: string;
        content: string;
        openerCategory?: 'random'| 'mystery' |'funny';
        starter?: string;
        state: GameState;
        players: Player[];
        activePlayer: Player| null;
        nextPlayer: Player| null;
        totalGameTime: number;
        currentPlayerTime?: number
    }
    export interface ChildProps {
        className?: string;
    }
}
