import React from 'react';

class FilterPanel extends React.Component {
    handleNameClick = () => {
        if(typeof this.props.nameFunc == 'function'){
            this.props.nameFunc();
        }
    };

    handleDateClick = () => {
        if(typeof this.props.dateFunc == 'function'){
            this.props.dateFunc();
        }
    };

    render(){
        let nameSortElement;
        if(this.props.sortName == "inc"){
            nameSortElement = <div className="sortUp">></div>
        } else if(this.props.sortName == "dec"){
            nameSortElement = <div className="sortDown">></div>
        } else {
            nameSortElement = null;
        }

        let dateSortElement;
        if(this.props.sortDate == "inc"){
            dateSortElement = <div className="sortUp">></div>
        } else if(this.props.sortDate == "dec"){
            dateSortElement = <div className="sortDown">></div>
        } else {
            dateSortElement = null;
        }

        return (
            <section className="sortPanel">
                <div className="sortCol1">
                    <h2 id="sortTitle">Sortowanie:</h2>

                </div>
                <div className="sortCol2" onClick={this.handleNameClick}>
                    Nazwa
                    {nameSortElement != null && nameSortElement}
                </div>
                <div className="sortCol3" onClick={this.handleDateClick}>
                    Data
                    {dateSortElement != null && dateSortElement}
                </div>

            </section>
        )
    }
}

module.exports = FilterPanel;
