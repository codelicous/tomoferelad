import React, {createContext, useContext, useState} from 'react';

type TriggerContextProps = {
    isTriggered: boolean;
    setIsTriggered: (isTriggered: boolean) => void;
}

const TriggerContext = createContext<TriggerContextProps| null>(null);
type TriggerProps = { children?: React.ReactNode };

export const TriggerProvider: React.FC<TriggerProps> = ({ children }) => {
    const [isTriggered, setIsTriggered] = useState(false);


    return (<TriggerContext.Provider value={{isTriggered, setIsTriggered}}>
        {children}
    </TriggerContext.Provider>)
}
export const useTrigger = () => {
    const context = useContext(TriggerContext);
    if (!context) {
        throw new Error('useTrigger must be used within the context');
    }
    return context;
};