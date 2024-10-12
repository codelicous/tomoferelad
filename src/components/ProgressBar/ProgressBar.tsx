import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({percentage, color}: { percentage: number, color: string| undefined }): React.JSX.Element {
    return (
        <div className={`${['container']} w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700`}>
            <div className={`${['progress-bar']} bg-${color} h-1.5 rounded-full`}
                style={{width: `${percentage}%`}}>
            </div>
        </div>
    );
}