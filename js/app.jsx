import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

import styles from '../scss/style.scss';

import MainContent from './components/MainContent.jsx';
import AddEvents from './components/AddEvents.jsx';
import BrowseEvents from './components/BrowseEvents.jsx';
import Map from './components/Map.jsx';
import EventPage from './components/EventPage.jsx';
class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path='/' component={MainContent}/>
                    <Route exact path='/events' component={BrowseEvents}/>
                    <Route path='/events/:id' component={EventPage}/>
                    <Route path='/addevents' component={AddEvents}/>
                    <Route path='/map' component={Map}/>
                </div>
            </HashRouter>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    )
});