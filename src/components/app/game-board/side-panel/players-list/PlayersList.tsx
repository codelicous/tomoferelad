import React from 'react';

export type PlayerListProps = ChildProps & { players: Player[], activePlayer: Player | null }

export default function PlayersList({players, activePlayer, className}: PlayerListProps): React.JSX.Element {
    const isActive: (id: string)=> boolean = (playerId: string)=> playerId === activePlayer?.id;
    return (
        <div className={className}>
            <ul>
                {players.map((player) => {

                    return (
                        <li key={player.id} className="flex flex-col">
                            <div className={ isActive(player.id) ? 'font-bold' : ''}>{player.name}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}