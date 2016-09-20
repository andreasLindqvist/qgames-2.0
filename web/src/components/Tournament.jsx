import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';

export default class Tournament extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: 'Apa', teams: []}, loading: true };
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
                this.setState({ data: data, loading: false});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        console.log('render Tournament');
        if (this.state.loading) {
            return (<Loader />);
        }
        console.log(this.state.data.teams);
        console.log(this.state.data.teams[0]);
        return (
            <div className="view tournament">
                <ReactCSSTransitionGroup transitionName="q-anim"
                                         transitionAppear={true}
                                         transitionAppearTimeout={500}
                                         transitionEnterTimeout={500} 
                                         transitionLeaveTimeout={300}>
                    <div className="row" id="top">
                        <div className="col-md-12" >
                            <h2>{this.state.data.name}</h2>
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
                        </div>
                    </div>
                    <div className="row" id="middle">
                        <div className="col-md-6" >
                            <h3>Played</h3>
                        </div>
                        <div className="col-md-6" >
                            <h3>Not played</h3>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
</div>);
    }
}