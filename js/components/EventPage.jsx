import React from 'react';
import Template from './Template.jsx';
import EventService from "./fetch/EventService";
import {Route, Link} from 'react-router-dom';
import EventMapWrapper from './googleApi/EventMapWrapper.jsx';

var Router = require('react-router');

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: false,
            deletePopup: false,
            eventDeleted: false,
            editionMode: false
        }
    }

    componentDidMount() {
        EventService.getEventById(this.props.match.params.id, data => {
            this.setState({
                event: data
            });
        });
    }

    handleDeleteBttn = () => {
        this.setState({
            deletePopup: true
        })
    };


    handleConfirmDeleteBttn = () => {
        this.setState({
            deletePopup: false,
            eventDeleted: true
        });
        EventService.deleteEventById(this.props.match.params.id);
        this.timeout = setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    };

    handleNoConfirmmDeleteBttn = () => {
        this.setState({
            deletePopup: false
        });
    };

    handleEditBttn = () => {
        this.setState({
            editionMode: true
        })

    };

    handleEndEditBttn = () => {
        let name = document.getElementById("editedName").innerText;
        let organisation = document.getElementById("editedOrg").innerText;
        let description = document.getElementById("editedDesc").innerText;
        let descriptionShort = document.getElementById("editedDescShort").innerText;
        let timeStart = document.getElementById("editedDateStart").innerText;
        let timeEnd = document.getElementById("editedDateEnd").innerText;
        let type = document.getElementById("editedType").innerText;
        let newImg = document.getElementById("editedImageURL").innerText;


        this.setState({
            event: {
                date: [timeStart.slice(0, 10) + "T" + timeStart.slice(12, 17),
                    timeEnd.slice(0, 10) + "T" + timeEnd.slice(12, 17)],
                desc: description,
                descShort: descriptionShort,
                img: newImg,
                name: name,
                organisation: organisation,
                type: type,
                place: this.state.event.place
            },
            editionMode: false
        }, () => EventService.changeEventById(this.props.match.params.id, this.state.event));
    };

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        let deleteElement = <div className="deleteEvent">
            <div className="deletePopUp">
                <h2>Czy na pewno chcesz usunąć dane wydarzenie?</h2>
                <button onClick={this.handleConfirmDeleteBttn}>Tak</button>
                <button onClick={this.handleNoConfirmmDeleteBttn}>Nie</button>
            </div>
        </div>;
        let eventDeleted = <div className="EventDeleted">
            <section>
                <h2>Wydarzenie zostalo usunięte</h2>
                <p>Nastąpi przekierowanie do strony głównej</p>
                <button><Link to='/'>Strona główna</Link></button>
            </section>
        </div>;

        return (
            this.state.event === false ? <h2>Wczytywanie strony</h2> : (
                <Template>
                        <img className="singleEventImg" src={this.state.event.img}/>
                        {this.state.editionMode && <div>
                            <p>Adres URL obrazu</p>
                            <p id="editedImageURL" className="editionMode"
                               contentEditable="true">{this.state.event.img}</p>
                        </div>}
                        <div className="singleEventcol1">
                            <section className="signleElTitle">
                                <h2 id="editedName" className={this.state.editionMode ? "editionMode" : ""}
                                    contentEditable={this.state.editionMode && true}>
                                    {this.state.event.name}</h2>
                                <h3 id="editedOrg" className={this.state.editionMode ? "editionMode" : ""}
                                    contentEditable={this.state.editionMode && true}><i>
                                    {this.state.event.organisation}</i></h3>
                            </section>
                            <p id="editedDesc" className={this.state.editionMode ? "editionMode" : "singleElDesc"}
                               contentEditable={this.state.editionMode && true}>
                                {this.state.event.desc}</p>
                            {this.state.editionMode && <div>
                                <p>Opis skrócony</p>
                                <p id="editedDescShort" className="editionMode"
                                   contentEditable="true">{this.state.event.descShort}</p>
                            </div>}
                        </div>
                        <div className="singleEventcol2">
                            <h2>Miejsce</h2>
                            <p id="editedPlace">{this.state.event.place}</p>
                            <h2>Rozpoczęcie</h2>
                            <p id="editedDateStart" className={this.state.editionMode ? "editionMode" : ""}
                               contentEditable={this.state.editionMode && true}>
                                {this.state.event.date[0].slice(0, 10)}, {this.state.event.date[0].slice(11, 16)}</p>
                            <h2>Zakończenie</h2>
                            <p id="editedDateEnd" className={this.state.editionMode ? "editionMode" : ""}
                               contentEditable={this.state.editionMode && true}>
                                {this.state.event.date[1].slice(0, 10)}, {this.state.event.date[1].slice(11, 16)}</p>
                            <h2>Typ wydarzenia</h2>
                            <p id="editedType" className={this.state.editionMode ? "editionMode" : ""}
                               contentEditable={this.state.editionMode && true}>{
                                this.state.event.type}</p>
                            {!this.state.editionMode ?
                                <button className="singleElBttn" onClick={this.handleEditBttn}>Edytuj
                                    wydarzenie</button> :
                                <button className="singleElBttn endEdit" onClick={this.handleEndEditBttn}>Zakończ
                                    edycję</button>}
                            <button className="singleElBttn" onClick={this.handleDeleteBttn}>Usuń wydarzenie</button>
                        </div>
                        <EventMapWrapper googleId={this.state.event.googlePosId}
                                         googlePos={this.state.event.googleGeoLoc}/>
                        {this.state.deletePopup && deleteElement}
                        {this.state.eventDeleted && eventDeleted}
                </Template>
            )
        )
    }
}

module.exports = EventPage;