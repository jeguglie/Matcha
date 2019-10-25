import React from 'react';
import './Menu.css';
import Logo from '../../img/logo/MatchApp-Logo.png';
import 'bulma/css/bulma.css';

function Menu(props){
    return (
        <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="">
                    <img src={Logo} />
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;