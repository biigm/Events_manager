import React from 'react';

import Template from './Template.jsx';
import SearchField from './main_content/SearchField.jsx';
import Mainbackground from './main_content/MainBackground.jsx';

class MainContent extends React.Component {

    componentDidMount(){
        localStorage.clear("search");
    }

    render(){
        return (
            <Template mainSite={true}>
                <SearchField/>
                <Mainbackground/>
            </Template>
        )
    }
}

module.exports = MainContent;