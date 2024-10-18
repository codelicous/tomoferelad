import {Dispatch, SetStateAction, useCallback, useEffect, useRef} from 'react';
import {useTrigger} from '@contexts/trigger.context.tsx';

export type StartGameDialogProps = ChildProps & { startGame: Dispatch<SetStateAction<boolean>>,
    showGameOpen: boolean, startingPlayerName: string}
export function StartGameDialog({ className, startingPlayerName,showGameOpen, startGame }: StartGameDialogProps) {
    const { setIsTriggered } = useTrigger();
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if(showGameOpen) {
            dialogRef.current?.showModal();
        }
    }, [showGameOpen]);
        const dialogTrigger = useCallback(()=>{
            dialogRef.current?.close();
            setIsTriggered(true)
        },[startGame]);

    return <dialog ref={dialogRef} className={className}>
            <div>
                <div className='capitalize'> {startingPlayerName}, </div>
                <div>You Start Our Story</div>
            </div>
            <button className='mt-6' onClick={dialogTrigger}>Let's Start</button>
        </dialog>;

}