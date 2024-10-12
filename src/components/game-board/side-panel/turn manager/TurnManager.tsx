import React from 'react';
import {formatTime, useTimer} from '@contexts/timer.context';
import {GameState} from '@components/app/consts.ts';

type TurnManagerProps = ChildProps & {gameState: GameState};
function TurnManager({className, gameState}: TurnManagerProps): React.JSX.Element {
    const {timer, startCountdown} = useTimer();

    React.useEffect(() => {
        if (gameState === GameState.InGame) {
            startCountdown();
        }
    }, [gameState, startCountdown]);

    return <div className={className}>
        <div>Total game time remaining: {formatTime(timer)}</div>
    </div>;
}

export default TurnManager;