import React from 'react';

export default class Table extends React.Component {
    render() {
        console.log('render Table');
        return (
            <div>
            <ul>
                {this.props.teams.map(function(team) {
                    let teamLink = `/#/team/${team._id}`;
                    console.log(teamLink);
                    return (
                        <li key={team._id} data-id={team._id}>
                            <a href={teamLink}>{team.name}</a>
                        </li>
                    );
                })}
            </ul>
            <ul>
                 {this.props.games.map(function(game) {
                     let gameLink = `/#/game/${game._id}`;
                     console.log(gameLink);
                     return (
                         <li key={game._id} data-id={game._id}>
                             <a href={gameLink}>{game.homeTeam.goals} - {game.awayTeam.goals}</a>
                         </li>
                     );
                })}
            </ul>
            </div>
            );
    }
}