import config from '../config.json';
import React from 'react';

export default class Team extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: '', playerId: '' } };
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
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        console.log('render Team');
        return (
            <div className="team">
                <h2>Team! {this.state.data.name}</h2>
                <h3>Spelar-ID: {this.state.data.playerId}</h3>
            </div>);
    }
}