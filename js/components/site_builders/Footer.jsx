import React from 'react';

class Footer extends React.Component {
    render(){
        return (
            <footer>
                <div className="container">

                    <strong className="footerTitle">Kamil Pszczółkowski @2018</strong>
                    <span className="footerInfo">Aplikacja do zarządzania wydarzeniami </span>
                    <div className="buttons">
                        <div className='btn1'></div>
                        <div className='btn2'></div>
                        <div className='btn3'></div>
                        <div className='btn4'></div>
                    </div>
                </div>
            </footer>
        )
    }
}

module.exports = Footer;