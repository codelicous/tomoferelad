import React, {useEffect, useMemo} from 'react';
import {useTimer} from '../../../../../contexts/timer.context';
import ProgressBar from './ProgressBar/ProgressBar.tsx';
import {TURN_TIME} from '../../../consts';

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
            <div className='font-bold'>{activePlayer?.name}'s Turn</div>
            <ProgressBar percentage={percentage} color={activePlayer?.color}/>
            <div>Next player: {nextPlayer?.name}</div>
        </div>
    );
}