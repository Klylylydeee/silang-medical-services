import React from 'react';
import { Row } from 'antd';
import SHISLogo from '../../../../styles/SHISLogo.png'

//Styles
import '../../local/landing/LandingStyles/LandingNavBar.scss'

function Navigation() {
    return (
        <Row>
            {/* Navigation Section of Landing Page */}
            <Row span={12}>
                <div className="portfolio-hero">
                    <div className="portfolio-menu">

                        {/* Navigation */}
                        <nav className="stroke">
                            <ul className="nav-menu">
                                {/* NavBar Logo */}
                                <img src={SHISLogo} alt='SHIS Logo' className="SHISLogo" />

                                <li className="menu-item"><a href="#Home">Home</a></li>
                                <li className="menu-item"><a href="#About">About Us</a></li>
                                <li className="menu-item"><a href="#Services">Services</a></li>
                                <li className="menu-item"><a href="#Locations">Locations</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Row>
        </Row>

    )
}
export default Navigation;
