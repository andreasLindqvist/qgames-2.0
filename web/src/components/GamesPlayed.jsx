import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class GamesPlayed extends React.Component {
    constructor() {
        super();
        this.state = { data: {} };
    }
    //componentDidMount() {
    //    this.getGamesPlayed();
    //}
    //getGamesPlayed() {
    //    console.log('getGamesPlayed', this.props.id);
    //    let url = `${config.webapi.tournaments}/${this.props.id}/games/played`;
    //    fetch(url)
    //    .then(function(response) {
    //        return response.json()
    //    })
    //    .then((json) => {
    //        console.log('json', json);
    //        this.setState({ data: json });
    //    });
    //}
    render() {
        console.log('GamesPlayed render', this.props.id);
        return (
                        <ul>
                {this.state.data.map(function(game) {
                return (
                    <li key={game._id} className="table">
                        <div className="team">
                            <span className="column logo">
                                //<img src="{game.}" game />
                            </span>
                            <span className="column name"></span>
                            <span className="column goals"></span>
                        </div>
                        <div className="team">
                            <span className="column logo">
                                //<img src="{game.}" game />
                            </span>
                            <span className="column name"></span>
                            <span className="column goals"></span>
                        </div>
                    </li>
                )
                }
                )}
            </ul>
//                                <ul>
//                        {this.state.data.map(function(tournament) {
//                            return (
//                                <li key={tournament._id} data-id={tournament.id}><a href={`/#/tournament/${tournament._id}`}>{tournament.name}</a></li>
//                                );
//})}
//                    </ul>             
        )
    }
}