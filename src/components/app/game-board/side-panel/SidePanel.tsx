import React from 'react';
import TurnManager from './turn manager/TurnManager.tsx';
import PlayersList from './players-list/PlayersList.tsx';
import GameStatus from './game-status/GameStatus';
import {TimerProvider} from '../../../../contexts/timer.context';
import {GAME_TIME, TURN_TIME} from '../../consts';

export type SidePanelProps = ChildProps & { game: Game, updatePlayerTurn: () => void };

function SidePanel({className, game, updatePlayerTurn}: SidePanelProps): React.JSX.Element {
    return (
            <div className={className}>
                <TimerProvider initialTime={TURN_TIME}>
                    <GameStatus className='flex basis-2/3 p-5 border-2' activePlayer={game.activePlayer} nextPlayer={game.nextPlayer} updatePlayerTurn={updatePlayerTurn} />
                </TimerProvider>
                <TimerProvider initialTime={GAME_TIME}>
                    <TurnManager className='flex basis-2/3 p-5 border-2' gameState={game.state}/>
                </TimerProvider>
            <PlayersList className='flex flex-1 p-5 border-2' players={game.players} activePlayer={game.activePlayer}/>
            </div>
    );
}

export default SidePanel;
