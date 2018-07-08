import React from 'react';

class Footer extends React.Component {
    render() {
        let mainStyle = {};
        if (this.props.mainSite) {
            mainStyle = {
                position: "fixed",
                bottom: "0",
                width: "100%"
            };
        }
        return (
            <footer style={mainStyle}>
                <div className="container">

                    <strong className="footerTitle">Kamil Pszczółkowski @2018</strong>
                    <span className="footerInfo">Aplikacja do zarządzania wydarzeniami </span>
                    <div className="buttons">
                        <a href="https://www.linkedin.com/in/kamil-pszcz%C3%B3%C5%82kowski-9b9894166/">
                            <div className='btn2'></div>
                        </a>
                        <a href="mailto:pszczolkowski.kamil@gmail.com">
                            <div className='btn3'></div>
                        </a>
                        <a href="https://github.com/kamilpszczolkowski">
                            <div className='btn4'></div>
                        </a>
                    </div>
                </div>
            </footer>
        )
    }
}

module.exports = Footer;