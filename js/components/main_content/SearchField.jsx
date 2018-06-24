import React from 'react';
import {Route, Link} from 'react-router-dom';

class SearchField extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputVal: ''
        }
    }

    handleInputChange = event => {
        this.setState({
            inputVal: event.target.value
        }, () => {
            localStorage.setItem("search", this.state.inputVal);
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        window.location.replace("#/events");
    };

    render(){
        return (
            <section className="search" onSubmit={this.handleSubmit}>
                <h2>Znajdź najciekawsze wydarzenia w Polsce</h2>
                <form>
                    <input id="mainSearch" type="text" placeholder="Czego szukasz?" value={this.state.inputVal} onChange={this.handleInputChange}/>
                    <input id="mainBttnSearch" type="submit" value=""/>
                </form>
            </section>
        )
    }
}

module.exports = SearchField;