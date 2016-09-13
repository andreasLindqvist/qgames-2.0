import React from 'react'

export default class Tournament extends React.Component {
    constructor() {
        super();
        this.state = { data: {} };
    }
    //getInitialState() {
    //    return { data: [] };
    //}
    componentDidMount() {
        this.loadTournamentFromServer();
    }
    loadTournamentFromServer() {
        $.ajax({
            url: `/webapi/teams/${this.props.params.id}`,
            //57d7a4dcdcba0f25a261fa75",
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
        console.log('render Tournament');
        let tournamentId = this.props.params.id;
        return <h2>Tournament!!: {this.state.data.name}</h2>
    }
}