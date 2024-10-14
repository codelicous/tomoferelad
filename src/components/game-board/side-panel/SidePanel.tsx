import React from 'react';
import PlayersList from './players-list/PlayersList';
import GameStatus from './game-status/GameStatus';
import {TimerProvider} from '@contexts/timer.context';

export type SidePanelProps = ChildProps & { game: Game, updatePlayerTurn: () => void, endGame: () => void };

function SidePanel({className, game, updatePlayerTurn, endGame}: SidePanelProps): React.JSX.Element {
    return (
        <TimerProvider initialTime={game.currentPlayerTime}>
            <div className={className}>
            <GameStatus className='flex basis-2/3 p-5 border-2' activePlayer={game.activePlayer} nextPlayer={game.nextPlayer} totalTurns={game.totalTurns} turnTime={game.currentPlayerTime} updatePlayerTurn={updatePlayerTurn} endGame={endGame}/>
            <PlayersList className='flex flex-1 p-5 border-2' players={game.players} activePlayer={game.activePlayer}/>
            </div>
        </TimerProvider>
    );
}

export default SidePanel;
