import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';
import TournamentList from './TournamentList';

export default class Start extends React.Component {
    render() {
        return (
            <div>
                <div className="row" id="top">
                    <div className="col-md-12" >
                        <p>
                            <button className="btn btn-primary btn-lg create-tournament" id="create-tournament" href="#" role="button">Skapa turnering</button>
                        </p>
                    </div>
                </div>
                <div className="row" id="middle">
                    <div className="col-md-12" >
                        <TournamentList />
                    </div>
                </div>
            </div>
            );
    }
}
