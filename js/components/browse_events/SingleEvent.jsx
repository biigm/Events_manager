import React from 'react';
import {Route, Link} from 'react-router-dom';


class SingleEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            usrDistance: false
        }
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1);
        let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c; // Distance in km
        return d;
    }

   deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    componentDidMount(){
        let usrX = localStorage.getItem("userPosX");
        let usrY = localStorage.getItem("userPosY");

        let eventX = this.props.googlePos[1];
        let eventY = this.props.googlePos[0];

        this.setState({
            usrDistance: this.getDistanceFromLatLonInKm(usrX, usrY, eventY, eventX).toFixed(2)
        })
    }

    render() {
        return (
            <article className="singleElement">
                <Link to={'/events/' + this.props.id}>
                    <img src={this.props.img} alt="obrazek"/>
                    <div className="mainElements">
                        <h2>{this.props.name}</h2>
                        <p>{this.props.descShort}</p>
                    </div>
                    <div className="col1">
                        <p><strong>Organizator:</strong> {this.props.organisation}</p>
                        <p><strong>Miejsce:</strong> {this.props.place}</p>
                        <p><strong>Kategoria:</strong> {this.props.type}</p>
                    </div>
                    <div className="col2">
                        <p><strong>Rozpoczęcie:</strong> <span
                            className="elementDate">{this.props.date[0].slice(0, 10)}, {this.props.date[0].slice(11, 16)}</span>
                        </p>
                        <p><strong>Zakończenie:</strong> <span
                            className="elementDate">{this.props.date[1].slice(0, 10)}, {this.props.date[1].slice(11, 16)}</span>
                        </p>
                        {this.state.usrDistance && <p><strong>Odleglość:</strong> <span>{this.state.usrDistance} KM</span></p>}
                    </div>
                </Link>
            </article>
        )
    }
}

module.exports = SingleEvent;