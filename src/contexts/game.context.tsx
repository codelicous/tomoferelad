import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';
import {PlayerColorBank} from '@components/app/consts';

type GameContextProps = {
    isTriggered: boolean;
    setIsTriggered: Dispatch<SetStateAction<boolean>>;
    players: Game['players'];
    setPlayers: Dispatch<SetStateAction<Game['players']>>;
}

const GameContext = createContext<GameContextProps| null>(null);

type GameProps = { children?: ReactNode };

export const GameProvider: React.FC<GameProps> = ({ children }) => {
    const [isTriggered, setIsTriggered] = useState(false);
    const [players, setPlayers] = useState<Game['players']>([
        {id: 1, name: 'Tom', color: PlayerColorBank.player1},
        {id: 2, name: 'Ofer', color: PlayerColorBank.player2}
    ]);

    const value = {
        isTriggered,
        setIsTriggered,
        players,
        setPlayers
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within the context');
    }
    return context;
};