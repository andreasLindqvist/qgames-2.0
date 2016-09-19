import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Loader extends React.Component {
    render() {
        return (
            <section className="loader">
                <ReactCSSTransitionGroup transitionName="q-anim"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500} 
                transitionLeaveTimeout={300}>
                        <img src="/img/loader_robot.gif" />
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}