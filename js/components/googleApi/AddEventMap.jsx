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
            const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
            const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

            let map = new google.maps.Map(node, {
                center: {lat: 52.161653, lng: 19.165485},
                zoom: 6.5
            });

            let input = document.getElementById('pac-input');

            let autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            let infowindow = new google.maps.InfoWindow();
            let infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            let marker = new google.maps.Marker({
                map: map
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            autocomplete.addListener('place_changed', function () {
                infowindow.close();
                let place = autocomplete.getPlace();

                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setPlace({
                    placeId: place.place_id,
                    location: place.geometry.location
                });
                marker.setVisible(true);

                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-id'].textContent = place.place_id;
                infowindowContent.children['place-address'].textContent = place.formatted_address;
                infowindow.open(map, marker);

                localStorage.setItem("googleID", place.place_id);
                localStorage.setItem("place", input.value);
                localStorage.setItem("googleLocationY", place.geometry.location.lat());
                localStorage.setItem("googleLocationX", place.geometry.location.lng());
            });


        }
    }

    render() {
        return (
            <section>
                <input id="pac-input" className="controls" type="text" placeholder="Enter a location"/>
                <div ref="map" id="map"></div>
                <div id="infowindow-content">
                    <span id="place-name" className="title"></span>
                    <br/>
                    Place ID <span id="place-id"></span>
                    <br/>
                    <span id="place-address"></span>
                </div>
            </section>
        )
    }
}