import * as React from 'react';
import SidePanel from './side-panel/SidePanel';
import StoryBoard from './story-board/StoryBoard';
import {GameState, PlayerColorBank} from '../app/consts';
import {useCallback, useEffect, useState} from 'react';
import openings from '@assets/openings.json';
import {StartGameDialog} from '@components/app/game-board/start-game-dialog/StartGameDialog';


function GameBoard({ className }: ChildProps): React.JSX.Element{
    // TODO: Is this something we want to create in a class?
    const [game, setGame] = useState<Game>({
        content: '',
        openerCategory: 'random',
        players: [{
                  id: 'tom',
                  name: 'Tom',
                  color: PlayerColorBank.player1
                    },
                  {
                      id: 'ofer',
                      name: 'Ofer',
                      color: PlayerColorBank.player2
                  }],
        activePlayer: null,
        nextPlayer: null,
        state: GameState.InGame,
        currentPlayerTime: 0, //TBD
        totalGameTime: 0
    });
    const [showGameDialog, setShowGameDialog] = useState(true);
    const [startGame, setStartGame] = useState<boolean>(false);
    const getOpener: (game: Game)=> string = useCallback((game:Game) => {
        const category = game.openerCategory || 'random';
        const selectedIndex = Math.floor(Math.random() * openings[category].length);

        return openings[category][selectedIndex];
    },[]);

    const updatePlayerTurn =  useCallback(()=>{
        setShowGameDialog(false);
        setGame((prevGame: Game) => {
            const currentPlayer = prevGame.activePlayer;
            const currentPlayerIndex = prevGame.players.indexOf(currentPlayer!);
            const nextPlayerIndex = (currentPlayerIndex + 1) % prevGame.players.length;
            return {
                ...prevGame,
                activePlayer: prevGame.players[nextPlayerIndex],
                nextPlayer: prevGame.players[(nextPlayerIndex + 1) % prevGame.players.length],

            };
        });
    }, [startGame]);

    // useEffect to initialize the game
    useEffect(() => {

        setGame((prevGame: Game) => ({
            ...prevGame,
            content: prevGame.starter || getOpener(prevGame),
            activePlayer: prevGame.players[0],
            nextPlayer: prevGame.players[1]
        }));
    }, [showGameDialog]);

    return (<div className= {className}>
            <SidePanel className='flex basis-1/3 flex-col justify-center'
                       game={game}
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
            className='bg-gray-800 text-white text-2xl min-w-5 p-6 rounded-lg shadow-xl backdrop:bg-gray-900/50'
            showGameOpen={showGameDialog}
            startGame={setStartGame}
            startingPlayerName={game?.activePlayer?.name || ''}/>
    </div>);
}

export default GameBoard;