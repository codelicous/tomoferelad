import { useCallback } from 'react';
import {useTrigger} from '@contexts/trigger.context.tsx';
import {Dialog} from '@components/app/dialog/dialog.tsx';

export type StartGameDialogProps = ChildProps & { startingPlayerName: string };
export function StartGameDialog({ className, startingPlayerName }: StartGameDialogProps) {
    const { isTriggered, setIsTriggered } = useTrigger();

        const dialogTrigger = useCallback(()=>{
          setIsTriggered(true);
        },[setIsTriggered]);

    return <Dialog className={className} isOpen={!isTriggered}>
        <div>
            <div className='capitalize'> {startingPlayerName},</div>
            <div>You Start Our Story</div>
        </div>
        <button className='mt-6' onClick={dialogTrigger}>Let's Start</button>
    </Dialog>;

}