/* Knowledge base */
/*
var team = {
    name: 'Italy',
    playerId: '57d7a944dcba0f25a261fc06',
    logo: 'http://25.media.tumblr.com/tumblr_mbh88bwCq71riuajgo1_1280.jpg'
};
var request = $.ajax(url, { dataType: 'json', type: 'POST', data: JSON.stringify(team), contentType: 'application/json;charset=utf-8' });
request.done(this.onFeedSaved.bind(this)).fail(this.onFeedSavedFail.bind(this));
*/

var apa = 123;
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import TestComponent from './components/TestComponent';
import Tournament from './components/Tournament';
import TournamentList from './components/TournamentList';
import Team from './components/Team';

console.log('apan3');

ReactDOM.render((
<Router>
    <Route path="/" component={TestComponent} />
    <Route path="/apa" component={TestComponent} />
    <Route path="/tournament" component={TournamentList} />
    <Route path="/tournament/:id" component={Tournament} />
    <Route path="/team/:id" component={Team} />
</Router>
),document.querySelector('#app'))
    //getElementById('app'))




//ReactDOM.render(<TestComponent />, document.getElementById('app'));