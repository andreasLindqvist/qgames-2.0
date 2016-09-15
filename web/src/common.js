
var apa = 123;
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import TestComponent from './components/TestComponent';
import Tournament from './components/Tournament';

console.log('apan3');

ReactDOM.render((
<Router>
    <Route path="/apa" component={TestComponent} />
    <Route path="/tournament/:id" component={Tournament} />
</Router>
),document.querySelector('#app'))
    //getElementById('app'))




//ReactDOM.render(<TestComponent />, document.getElementById('app'));