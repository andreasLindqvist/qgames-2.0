import config from '../config.json';
import React from 'react';

export default class GameForm extends React.Component {
    constructor() {
        super();
        this.state = { data: {} };
    }
    render() {
        console.log('render GameForm');
        return (   
            <section>
                <h2>Lägg till resultat</h2>
                <div className="form-group">
                    <select className="form-control">
                        <option>APA</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="number" id="homeGoals" className="form-control" placeholder="Mål för hemmalaget" />
                </div>
                <div className="form-group">
                    <input type="number" id="awayGoals" className="form-control" placeholder="Mål för bortalaget" />
                </div>
                <button type="button" className="btn btn-primary btn-set-game-result">Lägg till</button>
            </section>
        );
    }
}