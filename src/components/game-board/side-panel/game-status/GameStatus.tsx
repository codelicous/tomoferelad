import React, {useEffect, useMemo} from 'react';
import {useTimer} from '@contexts/timer.context';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import { Player } from '@types/Player';

export interface GameStatusProps extends ChildProps {
    activePlayer: Player| null,
    nextPlayer: Player| null,
    totalTurns: number,
    turnTime: number,
    updatePlayerTurn: () => void,
    endGame: () => void
}

export default function GameStatus({activePlayer, nextPlayer, updatePlayerTurn, turnTime, totalTurns, endGame} : GameStatusProps): React.JSX.Element {
    const {timer, startCountdown, stopCountdown} = useTimer();

    const isTimerEnd  = useMemo(() => timer === 0, [timer]);

    useEffect(() => {
        if (activePlayer) {
            startCountdown();
        }
    }, [activePlayer, startCountdown]);

    useEffect(() => {
        if (isTimerEnd && totalTurns !== 0) {
            updatePlayerTurn();
        } else if (totalTurns <= 0) {
            stopCountdown();
            endGame();
        }

    }, [endGame, stopCountdown, isTimerEnd, updatePlayerTurn]);

    const percentage = useMemo(() => (timer / turnTime) * 100, [timer]);

    return (
        <div className='flex flex-col p-5 border-2'>
            <div className='font-bold'><span className={`text-${activePlayer?.color}`}>{activePlayer?.name}'s</span> Turn</div>
            <ProgressBar percentage={percentage} color={activePlayer?.color}/>
            <div className='font-bold'>Turns left: {totalTurns}</div>
            <div>Next player: <span className={`text-${nextPlayer?.color}`}>{nextPlayer?.name}</span></div>
        </div>
    );
}