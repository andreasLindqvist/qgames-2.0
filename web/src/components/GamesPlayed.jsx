import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class GamesPlayed extends React.Component {
    constructor() {
        super();
        this.state = { data: {} };
    }
    componentDidMount() {
        this.getGamesPlayed();
    }
    getGamesPlayed() {
        console.log('getGamesPlayed');
        let url = `${config.webapi.tournaments}/${this.props.params.id}/games/played`;
        fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            console.log('json', json);
            this.setState({ data: data });
        });
    }
    render() {
                        
    }
}