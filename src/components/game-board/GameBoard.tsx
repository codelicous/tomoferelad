import * as React from 'react';
import SidePanel from './side-panel/SidePanel';
import StoryBoard from './story-board/StoryBoard';
import {GameState, PlayerColorBank} from '../app/consts';
import {useCallback, useEffect, useState} from 'react';
import openings from '@assets/openings.json';

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

    const getOpener: (game: Game)=> string = useCallback((game:Game) => {
        const category = game.openerCategory || 'random';
        const selectedIndex = Math.floor(Math.random() * openings[category].length);

        return openings[category][selectedIndex];
    },[]);

    const updatePlayerTurn =  useCallback(()=>{
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
    }, [setGame]);

    // useEffect to initialize the game
    useEffect(() => {
        setGame((prevGame: Game) => ({
            ...prevGame,
            content: prevGame.starter || getOpener(prevGame),
            activePlayer: prevGame.players[0],
            nextPlayer: prevGame.players[1]
        }));
    }, [getOpener]);

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
    </div>);
}

export default GameBoard;