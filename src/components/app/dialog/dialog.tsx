import {ReactNode, useEffect, useRef} from 'react';

export type DialogProps = ChildProps & { isOpen: boolean, children: ReactNode};

export function Dialog({ className, isOpen, children}: DialogProps): ReactNode {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if(isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close(); }
        }, [isOpen]);

    return <dialog ref={dialogRef} className={className}> {children}</dialog>;
}
