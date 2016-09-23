import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';

export default class CreateTournament extends React.Component {
    constructor() {
        super();
        this.state = { players: [], teams: [ { name: 'Italy', player: '' }, { name: 'England', player: '' }, { name: '', player: '' } ], loading: true };
    }
    componentDidMount() {
        this.getPlayers();
    }
    getPlayers() {
        console.log(`getPlayers: ${config.webapi.players}`);
        let url = config.webapi.players;
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    let { status, statusText } = response;
                    throw new Error(statusText);
                }
                return response.json();
            })
            .then((json) => {
                this.setState({ players: json, loading: false});
            })
            .catch((err) => {
                console.log('FEL', err);
                this.setState({ data: { name: 'Fel: ' + err, teams: [], games: [] }, loading: false });
                
            });
    }
    render() {
        console.log('render CreateTournament');
        if (this.state.loading) {
            return (<Loader />);
        }
        return (
            <section className="view create-tournament">
                <ReactCSSTransitionGroup transitionName="q-anim"
                                         transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <div className="row" id="top">
                    <div className="col-md-6 col-sm-12">
                        <h2>Skapa turnering</h2>
                        <form className="tournament-form">
                            <div className="item">
                                <input type="text" id="name" placeholder="Turneringens namn" />
                            </div>
                            <div className="item">
                                <label htmlFor="type">Typ</label>
                                <select id="type">
                                    <option value="0">Liga</option>
                                    <option value="1">Slutspel</option>
                                    <option value="2">Liga och slutspel</option>
                                </select>
                            </div>
                            <label>Lag</label>
                            {this.state.teams.map(team => {
                            return (
                                <div className="item team horizontal">
                                <input type="text" id="name" className="half-width" placeholder="Lagets namn" value={team.name} />
                                <select id="player" className="half-width">
                                        <option value="0">- Spelare -</option>
                                    {this.state.players.map(player => {
                                    return (
                                                <option key={player._id} value="{player._id}">{player.name}</option>);
                                    })}
                                </select>
                                </div>
                            );
                            })}
                            
                            <div className="item team">
                                <button className="btn plus">+</button>
                            </div>
                        </form>
                    </div>
                </div>
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}