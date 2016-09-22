import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';

export default class Team extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: '', playerId: '' }, loadingDone: false };
    }
    componentDidMount() {
        this.loadTeamFromServer();
    }
    loadTeamFromServer() {
        let url = `${config.webapi.teams}/${this.props.params.id}`;
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
        console.log('render Team');
        if (!this.state.loadingDone) {
            return (<Loader />);
        }
        return (
            <div className="view team">
                <ReactCSSTransitionGroup transitionName="q-anim"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
                    <h2>{this.state.data.name}</h2>
                    <p><strong>Spelar-ID:</strong> {this.state.data.playerId}</p>
                </ReactCSSTransitionGroup>
            </div>);
    }
}