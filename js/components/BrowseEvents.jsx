import React from 'react';

import Template from './Template.jsx';
import EventService from './fetch/EventService';
import SingleElement from './browse_events/SingleEvent.jsx';
import FilterPanel from './browse_events/FilterPanel.jsx';
import SearchPanel from './browse_events/SearchPanel.jsx';

class BrowseEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: false,
            sortByName: "inc",
            sortByDate: false,
            searchText: ''
        }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                localStorage.setItem("userPosX", pos.lng);
                localStorage.setItem("userPosY", pos.lat);
            });
        }

        EventService.getEvents(data => {
            if(localStorage.getItem("search") == null){
                this.setState({
                    events: data,
                    searchText: ''
                })
            } else {
                this.setState({
                    events: data,
                    searchText: localStorage.getItem("search")
                });
            }
        });
    }

    componentWillUnmount(){
        localStorage.clear("userPosX");
        localStorage.clear("userPosY");
    }

    handleClickSortName = () => {
        if (this.state.sortByName === false || this.state.sortByName === "dec") {
            this.setState({
                sortByName: "inc",
                sortByDate: false
            })
        } else {
            this.setState({
                sortByName: "dec",
                sortByDate: false
            })
        }
    };

    handleClickSortDate = () => {
        if (this.state.sortByDate === false || this.state.sortByDate === "dec") {
            this.setState({
                sortByName: false,
                sortByDate: "inc"
            })
        } else {
            this.setState({
                sortByName: false,
                sortByDate: "dec"
            })
        }
    };

    handleInputChange = (event) => {
        this.setState({
            searchText: event.target.value
        })
    };

    render() {
        let objToDisplay = [];
        let sortedArray;
        let filteredArray;
        for (let element in this.state.events) {
            let newElement = <SingleElement key={element} name={this.state.events[element].name}
                                            date={this.state.events[element].date}
                                            descShort={this.state.events[element].descShort}
                                            organisation={this.state.events[element].organisation}
                                            place={this.state.events[element].place}
                                            type={this.state.events[element].type} img={this.state.events[element].img}
                                            id={element} googlePos={this.state.events[element].googleGeoLoc}>
            </SingleElement>;
            objToDisplay.push(newElement);
        }

        if (this.state.sortByName == "inc") {
            sortedArray = objToDisplay.sort((a, b) => {
                if (a.props.name < b.props.name) return -1;
                if (a.props.name > b.props.name) return 1;
                return 0;
            });
        } else if (this.state.sortByName == "dec") {
            sortedArray = objToDisplay.sort((a, b) => {
                if (a.props.name < b.props.name) return 1;
                if (a.props.name > b.props.name) return -1;
                return 0;
            });
        } else if (this.state.sortByDate == "inc") {
            sortedArray = objToDisplay.sort((a, b) => {
                if (a.props.date < b.props.date) return 1;
                if (a.props.date > b.props.date) return -1;
                return 0;
            });
        } else if (this.state.sortByDate == "dec") {
            sortedArray = objToDisplay.sort((a, b) => {
                if (a.props.date < b.props.date) return -1;
                if (a.props.date > b.props.date) return 1;
                return 0;
            });
        }

        if(this.state.searchText != ''){
            filteredArray = sortedArray.filter( el => {
               if( el.props.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== (-1) ) return true;
               if( el.props.descShort.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== (-1) ) return true;
               if( el.props.type.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== (-1) ) return true;
               if( el.props.place.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== (-1) ) return true;
               return false;
            });
        } else {
            filteredArray = sortedArray;
        }

        return (
            <Template activeSite="browseEvents">
                <SearchPanel inputVal={this.state.searchText} function={this.handleInputChange}/>
                <FilterPanel sortName={this.state.sortByName} sortDate={this.state.sortByDate}
                             nameFunc={this.handleClickSortName} dateFunc={this.handleClickSortDate}/>
                {filteredArray.map(el => el)}
            </Template>
        )
    }
}

module.exports = BrowseEvents;