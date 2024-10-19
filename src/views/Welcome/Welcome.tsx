import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGame} from '@contexts/game.context';
import {MAX_PLAYERS, PlayerColorBank} from '@components/app/consts';

export const Welcome = (): React.JSX.Element => {
    const navigate = useNavigate();
    const { players, setPlayers } = useGame();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onPlayClick = useCallback(() => {
        const isValid = players.every((player) => player.name.trim().length);
        if (isValid) {
            navigate('/');
        }
    }, [players, navigate]);

    const addPlayer = useCallback(() => {
        const value = inputRef.current?.value;
        if (value) {
            setPlayers((prevState) => [...prevState, {
                name: value,
                id: prevState.length + 1,
                color: PlayerColorBank.player3
            }]);
        }
    }, [setPlayers]);

    return (
        <div className="form-control max-w-xs mx-auto gap-4">
            <h2>Welcome to the game!</h2>
            <label className="input input-bordered flex items-center gap-2">
                <input ref={inputRef} className="grow" placeholder="Name" type="text"/>
                {players.length <= MAX_PLAYERS && <kbd className="kbd kbd-sm" onClick={addPlayer}>+</kbd>}
            </label>
            {
                players.map((player) => (
                    <div key={player.id} className="flex items-center gap-2">
                        {player.name}
                    </div>
                ))
            }
            <button className="btn btn-primary" type="submit" onClick={onPlayClick}>
                Play
            </button>
        </div>
    );
};