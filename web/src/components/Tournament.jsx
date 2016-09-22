﻿import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';
import Table from './Table';
import GamesPlayed from './GamesPlayed';

export default class Tournament extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: 'Ingen turnering?', teams: [], games: []}, loading: true };
    }
    componentDidMount() {
        this.getTournament();
    }
    getTournament() {
        console.log(config.webapi.tournaments);
        console.log(`${config.webapi.tournaments}/${this.props.params.id}`);
        let url = `${config.webapi.tournaments}/${this.props.params.id}/details`;
        let _this = this;
        fetch(url)
            .then(function(response) {
                console.log('THEN');
                if (!response.ok) {
                    console.log('EJ OK', response);
                    let { status, statusText } = response;
                    throw new Error(statusText);
                }
                return response.json();
            })
            .then((json) => {
                this.setState({ data: json, loading: false});
            })
            .catch((err) => {
                console.error('FEL', err);
                this.setState({ data: { name: 'Fel: ' + err, teams: [], games: [] }, loading: false });
                
        });
    }
    render() {
        console.log('render Tournament');
        if (this.state.loading) {
            return (<Loader />);
        }
        console.log(this.state.data.teams);
        return (
            <div className="view tournament">
                <ReactCSSTransitionGroup transitionName="q-anim"
                    transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <div className="row" id="top">
                        <div className="col-md-12" >
                            <h2>{this.state.data.name}</h2>
                            <Table games={this.state.data.games} teams={this.state.data.teams} />
                        </div>
                    </div>
                    <div className="row" id="middle">
                        <div className="col-md-6" id="middle-left" >
                            <GamesPlayed id={ this.props.params.id } />                            
                        </div>
                        <div className="col-md-6" id="middle-right">
                            <h3>Not played</h3>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
</div>);
    }
}