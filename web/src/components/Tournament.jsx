import config from '../config.json';
import React from 'react';

export default class Tournament extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: '', teams: []} };
    }
    componentDidMount() {
        this.loadTournamentFromServer();
    }
    loadTournamentFromServer() {
        console.log(config.webapi.tournaments);
        console.log(`${config.webapi.tournaments}/${this.props.params.id}`);
        let url = `${config.webapi.tournaments}/${this.props.params.id}/details`;
        $.ajax({
            url: url,
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
        console.log('render Tournament');
        return (
            <div className="tournament">
                <h2>Tournament!!: {this.state.data.name}</h2>
                <h3>Lag:</h3>
                <ul>
                    {this.state.data.teams.map(function(team) {
                        let teamLink = `/#/team/${team._id}`;
                        return <li key={team._id} data-id={team.id}><a href={teamLink}>{team.name}</a></li>;
                    })}
                </ul>
            </div>);
    }
}