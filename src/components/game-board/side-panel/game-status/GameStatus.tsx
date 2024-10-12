import React, {useEffect, useMemo} from 'react';
import {useTimer} from '@contexts/timer.context.tsx';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import {TURN_TIME} from '../../../app/consts.ts';

export type GameStatusProps = ChildProps & { activePlayer: Player| null, nextPlayer: Player| null, updatePlayerTurn: () => void };

export default function GameStatus({activePlayer, nextPlayer, updatePlayerTurn} : GameStatusProps): React.JSX.Element {
    const {timer, startCountdown} = useTimer();

    const isTimerEnd  = useMemo(() => timer === 0, [timer]);

    useEffect(() => {
        if (activePlayer) {
            startCountdown();
        }
    }, [activePlayer, startCountdown]);

    useEffect(() => {
        if (isTimerEnd) {
            updatePlayerTurn();
        }
    }, [isTimerEnd, updatePlayerTurn]);

    const percentage = useMemo(() => (timer / TURN_TIME) * 100, [timer]);

    return (
        <div className='flex flex-col p-5 border-2'>
            <div className='font-bold'><span className={`text-${activePlayer?.color}`}>{activePlayer?.name}'s</span> Turn</div>
            <ProgressBar percentage={percentage} color={activePlayer?.color}/>
            <div>Next player: <span className={`text-${nextPlayer?.color}`}>{nextPlayer?.name}</span></div>
        </div>
    );
}