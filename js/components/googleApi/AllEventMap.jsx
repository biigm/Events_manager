import React, {Component} from 'react';
import ReactDOM from 'react-dom'

export default class AllEventMap extends Component {

    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate(){
        this.loadMap();

    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map3;
            const node = ReactDOM.findDOMNode(mapRef);

            let map = new google.maps.Map(node, {
                center: {lat: 52.161653, lng: 19.165485},
                zoom: 6.3
            });


            if(this.props.events !== false){
                for(let element in this.props.events){

                    let marker = new google.maps.Marker({
                        map: map,
                       title: this.props.events[element].name
                    });

                    let posX = this.props.events[element].googleGeoLoc[0];
                    let posY = this.props.events[element].googleGeoLoc[1];
                    let markerPos = new google.maps.LatLng({lat: Number(posY), lng: Number(posX)});

                    marker.setPlace({
                        placeId: this.props.events[element].googlePosId,
                        location: markerPos
                    });

                    let imgSource = 'src=' + this.props.events[element].img;

                    let contentString =   '<article class="singleElement singleElMap">' +
                        '<a href=#/events/'+ element +'/>' +
                       '<img '+ imgSource + ' alt="obrazek"/>' +
                       '<div class="mainElements">' +
                           '<h2>' + this.props.events[element].name + '</h2>' +
                           '<p>' + this.props.events[element].descShort + '</p>' +
                       '</div>' +
                       '<div class="col1">' +
                           '<p><strong>Organizator:</strong> ' + this.props.events[element].organisation + '</p>' +
                           '<p><strong>Miejsce:</strong> ' + this.props.events[element].place + '</p>' +
                           '<p><strong>Kategoria:</strong> ' + this.props.events[element].type + '</p>' +
                       '</div>' +
                       '<div class="col2">' +
                           '<p><strong>Rozpoczęcie:</strong> <span className="elementDate">' + this.props.events[element].date[0].slice(0, 10) + ', ' + this.props.events[element].date[0].slice(11, 16) +'</span>' +
                           '</p>' +
                           '<p><strong>Zakończenie:</strong> <span className="elementDate">' + this.props.events[element].date[1].slice(0, 10) + ', ' + this.props.events[element].date[1].slice(11, 16) +'</span>' +
                           '</p>' +
                       '</div>' +
                        '</a>' +
               '</article>';

                    let infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });

                }
            }
        }
    }

    render() {
        return (
            <section>
                <div ref="map3" id="map3"></div>
            </section>
        )
    }
}