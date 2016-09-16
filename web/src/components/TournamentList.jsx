import config from '../config.json';
import React from 'react';

export default class TournamentList extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    componentDidMount() {
        this.loadTournamentsFromServer();
    }
    loadTournamentsFromServer() {
        $.ajax({
            url: `${config.webapi.tournaments}`,
            //57d7b07adcba0f25a261ff04",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        console.log('render Tournaments');
        return (
            <div className="tournament-list">
                <h2>Tournaments:</h2>
                <ul>
                    {this.state.data.map(function(tournament) {
                        return <li key={tournament._id} data-id={tournament.id}><a href={`/#/tournament/${tournament._id}`}>{tournament.name}</a></li>;
                        })}
                </ul>
            </div>);

    }
}