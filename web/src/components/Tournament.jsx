import config from '../config.json';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from './Loader';
import Table from './Table';

export default class Tournament extends React.Component {
    constructor() {
        super();
        this.state = { data: { name: 'Apa', teams: []}, loading: true };
    }
    componentDidMount() {
        this.getTournament();
    }
    getTournament() {
        console.log(config.webapi.tournaments);
        console.log(`${config.webapi.tournaments}/${this.props.params.id}`);
        let url = `${config.webapi.tournaments}/${this.props.params.id}asas/details`;
        let _this = this;
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then((json) => {
                this.setState({ data: json, loading: false})
            })
            .catch(function(err) {
                console.error('FEL', err.toString());
        });
        /*$.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data, loading: false});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });*/
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
                    transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <div className="row" id="top">
                        <div className="col-md-12" >
                            <h2>{this.state.data.name}</h2>
                            <Table games={this.state.data.games} teams={this.state.data.teams} />
                        </div>
                    </div>
                    <div className="row" id="middle">
                        <div className="col-md-6" id="middle-left" >
                            <h3>Played</h3>
                        </div>
                        <div className="col-md-6" id="middle-right">
                            <h3>Not played</h3>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
</div>);
    }
}