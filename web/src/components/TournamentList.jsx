import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';

export default class TournamentList extends React.Component {
    constructor() {
        super();
        this.state = { data: [], loadingDone: false };
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
                this.setState({ data: data, loadingDone: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        console.log('render Tournaments');
        if (!this.state.loadingDone) {
            return (<Loader />);
        }
        return (
            <div className="view tournament-list">
                <ReactCSSTransitionGroup transitionName="q-anim"
                                         transitionAppear={true}
                                         transitionAppearTimeout={500}
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}>
                    <h2>Turneringar</h2>
                    <ul>
                        {this.state.data.map(function(tournament) {
                            return (
                                <li key={tournament._id} data-id={tournament.id}><a href={`/#/tournament/${tournament._id}`}>{tournament.name}</a></li>
                                );
                        })}
                    </ul>
                </ReactCSSTransitionGroup>
</div>);

    }
}