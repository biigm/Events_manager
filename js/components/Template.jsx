import React from 'react';

import Header from './site_builders/Header.jsx';
import Footer from './site_builders/Footer.jsx';

class Template extends React.Component {
    render() {
        return (
            <div>
                <Header activeSite={this.props.activeSite}/>
                <main>
                    <div className="clearFix container">
                        {this.props.children}
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}

module.exports = Template;