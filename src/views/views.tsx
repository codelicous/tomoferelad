import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import GameBoard from '../components/app/game-board/GameBoard';
import {Welcome} from './Welcome/Welcome';

export const Views = (): React.JSX.Element => (
    <Routes>
        <Route path="/" element={<GameBoard className="flex w-full h-full"/>} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);