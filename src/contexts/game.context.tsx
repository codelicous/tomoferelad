import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
export type StoryEntry  = { text: string, user: string, turn: number};
export type Story = {
    entries: StoryEntry[];
    opener: string;
}

type GameContextProps = {
    isTriggered: boolean;
    setIsTriggered: (isTriggered: boolean) => void;
    story: Story;
    setStory: (story: Story) => void;
    addEntry: (storyEntry: StoryEntry) => void;
    addOpener: (opener: string) => void;
    content : string
}

const GameContext = createContext<GameContextProps| null>(null);
type GameProps = { children?: React.ReactNode };

export const GameProvider: React.FC<GameProps> = ({ children }) => {
    const [isTriggered, setIsTriggered] = useState(false);
    const [story,setStory] = useState<Story>({entries: [], opener:''});
    const [content, setContent] = useState('');
    const addEntry = useCallback((storyEntry: StoryEntry) => {
        setStory({...story, entries: [...story.entries, storyEntry]});
    }, [setStory, story]);
    const addOpener  = useCallback((opener: string)=>{
        setStory({...story, opener});
    },[setStory, story]);

    useEffect(() => {
        setContent(  `${story.opener} ${story.entries.reduce<string>((acc: string, currentValue: StoryEntry)=>
         acc.concat(currentValue.text),'')}`)
    }, [story, opener]);
    return (<GameContext.Provider value={
        {
          isTriggered,
          setIsTriggered,
          story,
          setStory,
          addEntry,
          addOpener,
          content,
        }}>
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
