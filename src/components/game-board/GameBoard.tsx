import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from './side-panel/SidePanel';
import StoryBoard from './story-board/StoryBoard';
import {
    GameState,
    MAX_TURNS_PER_PLAYER,
    PlayerColorBank,
    TURN_TIME,
} from '../app/consts';
import {useCallback, useEffect, useState} from 'react';
import openings from '@assets/openings.json';
import {StartGameDialog} from '@components/app/game-board/start-game-dialog/StartGameDialog';
import {GameProvider} from '@contexts/game.context.tsx';

function GameBoard({ className }: ChildProps): React.JSX.Element{
    const navigate = useNavigate();

    // TODO: Change this to a dynamic value once we have a players list logic
    const players = [
        {
            id: 'tom',
            name: 'Tom',
            color: PlayerColorBank.player1
        },
        {
            id: 'ofer',
            name: 'Ofer',
            color: PlayerColorBank.player2
        }
    ];
    const [game, setGame] = useState<Game>({
        content: '',
        openerCategory: 'random',
        players: players,
        activePlayer: null,
        nextPlayer: null,
        state: GameState.InGame,
        currentPlayerTime: TURN_TIME,
        totalTurns: players.length * MAX_TURNS_PER_PLAYER
    });
    const [showGameDialog, setShowGameDialog] = useState(true);
    const getOpener: (game: Game)=> string = useCallback((game:Game) => {
        const category = game.openerCategory || 'random';
        const selectedIndex = Math.floor(Math.random() * openings[category].length);

        return openings[category][selectedIndex];
    },[]);

    const setEndGame = useCallback(() => {
        // TODO: Add logic to end the game
        setGame((prevGame: Game) => ({
            ...prevGame,
            state: GameState.Ended
        }));

        navigate('/game-over');
    }, [navigate, setGame]);

    const updatePlayerTurn =  useCallback(()=>{
        setShowGameDialog(false);
        setGame((prevGame: Game) => {
            const currentPlayer = prevGame.activePlayer;
            const currentPlayerIndex = prevGame.players.indexOf(currentPlayer!);
            const nextPlayerIndex = (currentPlayerIndex + 1) % prevGame.players.length;
            return {
                ...prevGame,
                totalTurns: prevGame.totalTurns - 1,
                activePlayer: prevGame.players[nextPlayerIndex],
                nextPlayer: prevGame.players[(nextPlayerIndex + 1) % prevGame.players.length],

            };
        });
    }, []);

    // useEffect to initialize the game
    useEffect(() => {

        setGame((prevGame: Game) => ({
            ...prevGame,
            content: prevGame.starter || getOpener(prevGame),
            activePlayer: prevGame.players[0],
            nextPlayer: prevGame.players[1]
        }));
    }, [showGameDialog, getOpener]);

    return (<div className= {className}>
        <GameProvider>
        <SidePanel className='flex basis-1/3 flex-col justify-center'
                   game={game}
                   endGame={setEndGame}
                   updatePlayerTurn={updatePlayerTurn}>
        </SidePanel>
        <StoryBoard className='flex basis-2/3 border-2
            max-2xl board-container flex-col p-6
             relative justify-center align-middle items-center'
                    content={game.content}
                    activePlayer={game?.activePlayer}
                    updatePlayerTurn={updatePlayerTurn}>
        </StoryBoard>
        <StartGameDialog
            startingPlayerName={game?.activePlayer?.name || ''}/>
        </GameProvider>
    </div>);
}

export default GameBoard;
