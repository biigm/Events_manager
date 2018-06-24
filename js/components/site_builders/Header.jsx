import React from 'react';
import {Route, Link} from 'react-router-dom';

import Navigation from './header/Navigation.jsx';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="mainTitles">
                        <div className="logo"/>
                        <h1><Link to='/'>BEST EVENTS<span>FIND YOUR REALITY</span></Link></h1>
                    </div>
                    <Navigation activeSite={this.props.activeSite}/>
                </div>
            </header>
        )
    }
}

module.exports = Header;