import React from 'react';
import EventService from './fetch/EventService';
import {Route, Link} from 'react-router-dom';
import AddEventMapWrapper from './googleApi/AddEventMapWrapper.jsx';

import Template from './Template.jsx';

class AddEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date_start: "",
            date_end: "",
            desc: "",
            descShort: "",
            img: "",
            name: "",
            organisation: "",
            type: "",
            validationErrors: [],
            validationOK: false
        }
    }

    handleInputName = event => {
        this.setState({
            name: event.target.value
        })
    };

    handleInputDateStart = event => {
        if (this.state.date_end == "") {
            this.setState({
                date_end: event.target.value
            })
        }
        this.setState({
            date_start: event.target.value
        })
    };

    handleInputDateEnd = event => {
        this.setState({
            date_end: event.target.value
        })
    };

    handleInputDesc = event => {
        this.setState({
            desc: event.target.value
        })
    };

    handleInputDescShort = event => {
        this.setState({
            descShort: event.target.value
        })
    };

    handleInputImg = event => {
        this.setState({
            img: event.target.value
        })
    };

    handleInputOrganisation = event => {
        this.setState({
            organisation: event.target.value
        })
    };

    handleInputType = event => {
        this.setState({
            type: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        let errorTable = [];

        if (this.state.name.length == 0) {
            errorTable.push("Podaj nazwę wydarzenia");
        }

        if (this.state.organisation.length == 0) {
            errorTable.push("Podaj nazwę organizatora");
        }

        if (this.state.type.length == 0) {
            errorTable.push("Wybierz rodzaj wydarzenia");
        }

        if (this.state.date_start.length == 0) {
            errorTable.push("Podaj datę rozpoczęcia wydarzenia");
        }

        if (this.state.date_end.length == 0) {
            errorTable.push("Podaj datę zakończenia wydarzenia");
        }


        let first_date = new Date(this.state.date_start);
        let second_date = new Date(this.state.date_end);
        if (first_date > second_date) {
            errorTable.push("Data rozpoczęcia nie może być większa od daty zakończenia");
        }

        if (this.state.descShort.length == 0) {
            errorTable.push("Podaj skrócony opis wydarzenia");
        }

        if (this.state.desc.length == 0) {
            errorTable.push("Podaj pełny opis wydarzenia");
        }

        if (this.state.img.length == 0) {
            errorTable.push("Podaj adres URL do zdjęcia wydarzenia");
        }

        let place = localStorage.getItem("place");
        let googlePosID = localStorage.getItem("googleID");
        let googlePosGeom = [localStorage.getItem("googleLocationX"), localStorage.getItem("googleLocationY")];
        console.log(googlePosID, googlePosGeom);
        if (googlePosID == null) {
            errorTable.push("Wybierz pozycję dla wydarzenia z map google");
        }

        this.setState({
            validationErrors: errorTable
        });

        if (errorTable.length === 0) {

            let dataToSend = {
                date: [this.state.date_start, this.state.date_end],
                desc: this.state.desc,
                descShort: this.state.descShort,
                img: this.state.img,
                name: this.state.name,
                organisation: this.state.organisation,
                place: place,
                type: this.state.type,
                googlePosId: googlePosID,
                googleGeoLoc: googlePosGeom
            };

            this.setState({
                validationOK: true
            });

            localStorage.clear("googleID");
            localStorage.clear("googleLocation");
            EventService.sendEvent(dataToSend, () => console.log("udało się"));
        } else {
            window.scrollTo({
                "behavior": "smooth",
                "left": 0,
                "top": 0
            })
        }
    };

    handleBttnNextEvent = () => {
        this.setState({
            date_start: "",
            date_end: "",
            desc: "",
            descShort: "",
            img: "",
            name: "",
            organisation: "",
            place: "",
            type: "",
            validationErrors: [],
            validationOK: false
        });
    };

    getGooglePlace = place => {
        this.setState({
            googlePlace: place
        })
    };

    componentDidMount() {
        localStorage.clear("search");
    }

    componentWillUnmount() {
        localStorage.clear("place");
        localStorage.clear("googleID");
        localStorage.clear("googleLocationX");
        localStorage.clear("googleLocationY");
    }

    render() {
        let errorsEl = (
            <div className="validationErrors">
                <h2>W formularzu występują następujące błędy:</h2>
                <ul>
                    {this.state.validationErrors.map(el => <li key={el}>{el}</li>)}
                </ul>
            </div>
        );
        let validationPassedEl = (
            <div className="validationPassed">
                <section className="validationPassedPrompt">
                    <h2>Wydarzenie zostalo dodane do bazy</h2>
                    <button><Link to='/events'>Przejdź do wydarzeń</Link></button>
                    <button onClick={this.handleBttnNextEvent}>Dodaj kolejne wydarzenie</button>
                </section>
            </div>
        );

        return (
            <Template activeSite="addEvents">
                <h2 className="addEventTitle">Kreator nowego wydarzenia</h2>
                {this.state.validationErrors.length > 0 && errorsEl}
                <form onSubmit={this.handleSubmit}>
                    <div className="restrict">
                        <label>
                            Nazwa wydarzenia:
                            <input type="text" placeholder="Nazwa wydarzenia" value={this.state.name}
                                   onChange={this.handleInputName}/>
                        </label>
                        <label>
                            Organizator wydarzenia:
                            <input type="text" placeholder="Organizator" value={this.state.organisation}
                                   onChange={this.handleInputOrganisation}/>
                        </label>
                        <label>
                            Rodzaj wydarzenia:
                            <input type="text" placeholder="Typ wydarzenia" value={this.state.type}
                                   onChange={this.handleInputType}/>
                        </label>
                        <label>
                            Data/godzina rozpoczęcia:
                            <input type="datetime-local" value={this.state.date_start}
                                   onChange={this.handleInputDateStart}/>
                        </label>
                        <label>
                            Data/godzina zakończenia:
                            <input type="datetime-local" value={this.state.date_end}
                                   onChange={this.handleInputDateEnd}/>
                        </label>
                        <label>
                            Skrócony opis wydarzenia:
                            <input type="text" id="shortInput" placeholder="Krótki opis" value={this.state.descShort}
                                   onChange={this.handleInputDescShort}/>
                        </label>
                        <label>
                            Pełny opis wydarzenia:
                            <textarea placeholder="Pełny opis wydarzenia" value={this.state.desc}
                                      onChange={this.handleInputDesc}/>
                        </label>
                        <label>
                            Adres URL obrazu:
                            <input type="text" id="imgInput" placeholder="Adres URL obrazu" value={this.state.img}
                                   onChange={this.handleInputImg}/>
                        </label>
                    </div>
                    Lokalizacja wydarzenia:
                    <AddEventMapWrapper func={this.getGooglePlace}/>
                    <div className="restrict">
                        <input type="submit" value="Wyślij"/>
                    </div>
                </form>
                {this.state.validationOK && validationPassedEl}</Template>
        )
    }
}

module.exports = AddEvents;