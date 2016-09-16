import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Tournament extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: 'Apa', teams: []}, loadingDone: false };
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
                this.setState({ data: data, loadingDone: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        console.log('render Tournament');
        if (!this.state.loadingDone) {
            return (<div className="tournament loading"><p>LADDAR!!!</p></div>);
        }
        console.log(this.state.data.teams);
        console.log(this.state.data.teams[0]);
        return (
            <div className="tournament">
                <ReactCSSTransitionGroup transitionName="example"
                                         transitionAppear={true}
                                         transitionAppearTimeout={500}>
                    <h2>Tournament!!: {this.state.data.name}</h2>
                    <h3>Lag:</h3>
                    <ul>
                        {this.state.data.teams.map(function(team) {
                        let teamLink = `/#/team/${team._id}`;
                        console.log(teamLink);
                        return (
                            <li key={team._id} data-id={team._id}>
                                <a href={teamLink}>{team.name}</a>
                            </li>
                        );
                        })}
                    </ul>
                </ReactCSSTransitionGroup>
</div>);
    }
}