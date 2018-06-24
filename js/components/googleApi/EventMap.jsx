import React, {Component} from 'react';
import ReactDOM from 'react-dom'

export default class AddEventMap extends Component {

    componentDidMount() {
        this.loadMap(); // call loadMap function to load the google map
    }

    loadMap() {
        if (this.props && this.props.google) { // checks to make sure that props have been passed
            const {google} = this.props; // sets props equal to google
            const maps = google.maps; // sets maps to google maps props
            const mapRef = this.refs.map2; // looks for HTML div ref 'map'. Returned in render below.
            const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

            let map = new google.maps.Map(node, {
                center: {lat: 52.161653, lng: 19.165485},
                zoom: 6.5
            });

            let marker = new google.maps.Marker({
                map: map
            });

            let markerPos = new google.maps.LatLng({lat: Number(this.props.googlePos[1]), lng: Number(this.props.googlePos[0])});

            marker.setPlace({
                placeId: this.props.googleId,
                location: markerPos
            });

            map.setCenter(markerPos);
            map.setZoom(10);
        }
    }

    render() {
        return (
            <section>
                <div ref="map2" id="map2"></div>
            </section>
        )
    }
}