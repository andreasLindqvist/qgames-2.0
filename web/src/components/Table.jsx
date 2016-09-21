import React from 'react';

export default class Table extends React.Component {
    render() {
        if (!this.props.teams || this.props.teams.length == 0 || !this.props.games || this.props.games.length == 0) {
            return (<div>Ingen tabell</div>);
        }
        console.log('render Table');
        let table = this.props.teams.map(function(team) { return { _id: team._id, name: team.name, logo: team.logo, played: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0 }; });
        var numGames = this.props.games.length;
        for (var i = 0; i < numGames; i++) {
            var game = this.props.games[i];
            var homeTeam = table.find(team => { return team._id == game.homeTeam.id});
            var awayTeam = table.find(team => { return team._id == game.awayTeam.id});
            if (!homeTeam || !awayTeam)
                continue;
            homeTeam.played++;
            awayTeam.played++;
            homeTeam.scored += game.homeTeam.goals;
            homeTeam.conceded += game.awayTeam.goals;
            awayTeam.scored += game.awayTeam.goals;
            awayTeam.conceded += game.homeTeam.goals;
            if (game.homeTeam.goals > game.awayTeam.goals) {
                console.log('hemma!')
                homeTeam.wins++;
                awayTeam.losses++;
                homeTeam.points += 3;
            }
            else if (game.homeTeam.goals < game.awayTeam.goals) {
                console.log('hemma!')
                awayTeam.wins++;
                homeTeam.losses++;
                awayTeam.points += 3;
            }
            else {
                console.log('lika!')
                awayTeam.draws++;
                homeTeam.draws++;
                homeTeam.points += 1;
                awayTeam.points += 1;
            }
        }
        table.sort((team1, team2) => { 
            if (team1.points > team2.points) {
                return -1;
            }
            else if (team1.points < team2.points) {
                return 1
            }
            else if ((team1.scored - team1.conceded) > (team2.scored - team2.conceded)) {
                return -1;
            }
            else if ((team1.scored - team1.conceded) < (team2.scored - team2.conceded)) {
                return 1;
            }
            else if (team1.scored > team2.scored) {
                return -1;
            }
            else if (team1.scored < team2.scored) {
                return 1;
            }
            else {
                return (team1.name < team2.name) ? -1 : 1;
            }
        });
        return (
                        <ul className="table">
                <li className="team table-header">
                    <span className="column position">#</span>
                    <span className="column team-name">&nbsp;</span>
                    <span className="column played">P</span>
                    <span className="column wins">W</span>
                    <span className="column draws">D</span>
                    <span className="column losses">L</span>
                    <span className="column scored">+</span>
                    <span className="column conceded">-</span>
                    <span className="column goaldifference">+/-</span>
                    <span className="column points">Poäng</span>
                </li>
                {table.map(function(team, index) {
                let teamLink = `/#/team/${team._id}`;
                console.log(teamLink);
                return (
                            <li key={team._id} data-id={team._id} className="team">
                                <span className="column position">{index + 1}</span>
                                <span className="column team-name"><img className="logo" src={team.logo} /><a href={teamLink}>{team.name}</a></span>
                                <span className="column played">{team.played}</span>
                                <span className="column wins">{team.wins}</span>
                                <span className="column draws">{team.draws}</span>
                                <span className="column losses">{team.losses}</span>
                                <span className="column scored">{team.scored}</span>
                                <span className="column conceded">{team.conceded}</span>
                                <span className="column difference">{ ((team.scored - team.conceded > 1) ? '+' : '') }{team.scored - team.conceded}</span>
                                <span className="column points">{team.points}</span>
                            </li>
                );
                })}
            </ul>
            );
    }
}