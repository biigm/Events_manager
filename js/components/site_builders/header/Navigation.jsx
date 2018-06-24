import React from 'react';
import {Route, Link} from 'react-router-dom';

class Navigation extends React.Component {
    componentDidMount(){
    }
    render(){
        return (
            <nav>
                <ul>
                    <li className={this.props.activeSite == "browseEvents" ? "active" : ""}><Link to='/events'>Przeglądaj zdarzenia</Link></li>
                    <li className={this.props.activeSite == "addEvents" ? "active" : ""}><Link to='/addevents'>Dodaj zdarzenie</Link></li>
                    <li className={this.props.activeSite == "map" ? "active" : ""}><Link to='/map'>Mapa</Link></li>
                </ul>
            </nav>
        )
    }
}

module.exports = Navigation;
