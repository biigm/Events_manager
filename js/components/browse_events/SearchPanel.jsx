import React from 'react';


class SearchPanel extends React.Component {

    handleInputChange = event => {
        if (typeof this.props.function == 'function') {
            this.props.function(event);
        }
    }

    render() {
        return (
            <section className="sortPanel noBorder">
                <div className="sortCol1">
                </div>
                <input id="searchInevents" placeholder="Czego szukasz?" type="text" value={this.props.inputVal} onChange={this.handleInputChange}/>
                <div id="serachIcon"></div>
            </section>
        )
    }
}

module.exports = SearchPanel;