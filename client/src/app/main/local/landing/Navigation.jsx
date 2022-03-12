import React, { useState, useEffect } from 'react'
import { Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

//Images
import SHISLogo from '../../../../styles/SHISLogo.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build") {
    require('../../local/landing/LandingStyles/LandingNavBar.scss');
}

function Navigation() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const history = useNavigate();

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    return (
        <Row>
            {/* Navigation Section of Landing Page */}
            <Row>
                <header className="MobileNav">
                    <div className="portfolio-hero">
                        <div className="portfolio-menu">

                            {/* Navigation */}
                            <nav className="stroke">
                                <div className = "ham">
                                    <button onClick={toggleNav} className="btn"><MenuOutlined /></button>
                                </div>

                                {(toggleMenu || screenWidth > 768) && (
                                    <ul className="nav-menu">

                                        {/* NavBar Logo */}
                                        <img src={SHISLogo} alt='SHIS Logo' className="SHISLogo" onClick={() => {
                                            window.open("https://portal.silangmedical.com/", "_blank")
                                        }} style={{ cursor: "pointer" }}/>

                                        <li className="menu-item"><a {...window.location === "" ? { href: "#Home"} : { onClick: () => {
                                            history({
                                                pathname: `/`
                                            })
                                        } }} >Home</a></li>
                                        <li className="menu-item"><a href="#About">About Us</a></li>
                                        <li className="menu-item"><a href="#Services">Services</a></li>
                                        <li className="menu-item"><a href="#Locations">Locations</a></li>
                                    </ul>
                                )}

                            </nav>
                        </div>
                    </div>
                </header>
            </Row>
        </Row>

    )
}
export default Navigation;
