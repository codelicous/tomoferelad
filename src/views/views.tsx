import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Welcome} from './Welcome/Welcome';
import {GameOver} from './GameOver/GameOver.tsx';
import GameBoard from '@components/game-board/GameBoard';

export const Views = (): React.JSX.Element => (
    <Routes>
        <Route path='/' element={<GameBoard className='flex w-full h-full'/>} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/game-over' element={<GameOver />} />
        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
);