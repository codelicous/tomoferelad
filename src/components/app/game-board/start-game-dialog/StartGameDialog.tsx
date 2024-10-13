import {Dispatch, SetStateAction, useCallback, useEffect, useRef} from 'react';


export type StartGameDialogProps = ChildProps & { startGame: Dispatch<SetStateAction<boolean>>,
    showGameOpen: boolean, startingPlayerName: string}
export function StartGameDialog({ className, startingPlayerName,showGameOpen, startGame }: StartGameDialogProps) {
    let dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if(showGameOpen) {
            dialogRef.current?.showModal();
        }

    }, [showGameOpen]);
        const dialogTrigger = useCallback(()=>{

            dialogRef.current?.close()
            startGame(true)
        },[startGame])
    return <dialog ref={dialogRef} className={className}>
            <div>
            <div className='capitalize'> {startingPlayerName}, </div>
            <div>You Start Our Story</div>
            </div>

            <button className='mt-6' onClick={dialogTrigger}>Let's Start</button>
        </dialog>

}