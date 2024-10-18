import React, {createContext, useContext, useState} from 'react';

type GameContextProps = {
    isTriggered: boolean;
    setIsTriggered: (isTriggered: boolean) => void;
}

const GameContext = createContext<GameContextProps| null>(null);
type GameProps = { children?: React.ReactNode };

export const GameProvider: React.FC<GameProps> = ({ children }) => {
    const [isTriggered, setIsTriggered] = useState(false);

    return (<GameContext.Provider value={{isTriggered, setIsTriggered}}>
        {children}
    </GameContext.Provider>);
};
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within the context');
    }
    return context;
};