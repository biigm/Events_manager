import React from 'react';

import Template from './Template.jsx';
import EventMapWrapper from './googleApi/AllEventMapWrapper.jsx';
import EventService from "./fetch/EventService";




class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: false
        }
    }

    componentDidMount(){
        localStorage.clear("search");

        EventService.getEvents(data => {
                this.setState({
                    events: data
                });
            });
    }

    render(){

        return (
            <Template activeSite="map">
                <h2 className="mapTitle">Mapa wszystkich wydarzeń</h2>
                <EventMapWrapper events={this.state.events}/>
            </Template>
        )
    }
}

module.exports = Map;


