import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';

export type StoryBoardProps = ChildProps & { content: string, updatePlayerTurn: () => void };

export default function StoryBoard({className, content, updatePlayerTurn}: StoryBoardProps): React.JSX.Element {
    const [submitted, setSubmitted] = useState<string>('');
    const [activeText, setActiveText] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    document.onclick = () =>  inputRef && inputRef.current?.focus();

    useEffect(() => {
        setSubmitted(content);
    }, [content]);

    const submitText = () => {
        if (!activeText) {
            return;
        }
        const aggregatedText = `${submitted} ${activeText.trim()}`;
        setActiveText('');
        setSubmitted(aggregatedText);
        inputRef?.current?.focus();
        updatePlayerTurn();

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !inputDisabled) {
            e.preventDefault();
            submitText();
        }
    };

    const inputDisabled = useMemo(() => {
        const threeWordsPattern:RegExp = /^\S+ \S+ \S+$/;
        return !threeWordsPattern.test(activeText);
    }, [activeText]);

    return <div className={className}>
        <div className='flex flex-col h-3/4 w-full items-center'>
            <div className='text-container w-full border-2 h-3/4 flex flex-1 text-xl p-5'>
                <div>{submitted}</div>
                <input
                    ref={inputRef}
                    autoFocus={true}
                    type='text'
                    value={activeText}
                    onKeyDown={handleKeyDown}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setActiveText(e.target.value)}
                    className='ml-2 bg-transparent h-7 w-fit text-xl'
                ></input>
            </div>
            <button disabled={inputDisabled}
                    onClick={submitText}
                    className='w-56 mt-6 disabled:bg-gray-400
             disabled:cursor-not-allowed disabled:opacity-50'>Submit my Words</button>
        </div>
    </div>
}