
var apa = 123;
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TestComponent from './components/TestComponent';
import Tournament from './components/Tournament';
import GameForm from './components/GameForm';

console.log('Common');

ReactDOM.render((
<Router>
    <Route path="/apa" component={TestComponent} />
    <Route path="/tournament/:id" component={Tournament} />
</Router>
),document.querySelector('#app'));
    //getElementById('app'))
ReactDOM.render(<GameForm />, document.querySelector('#sectionGameForm'));



//ReactDOM.render(<TestComponent />, document.getElementById('app'));