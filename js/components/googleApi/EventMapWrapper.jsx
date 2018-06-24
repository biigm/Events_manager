import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import EventMap from './EventMap.jsx';

class TempApp2 extends Component {
    render() {
        return (
            <div>
                <EventMap google={this.props.google} googleId={this.props.googleId} googlePos={this.props.googlePos}/>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAF0dMnU6SE60S3AJT1t7UpWTbVgZI_5CQ',
})(TempApp2)