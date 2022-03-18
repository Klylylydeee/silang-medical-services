import React, { useState, useEffect } from 'react'
import { Row, Drawer, Button } from 'antd';
import { useSelector } from "react-redux";
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

//Images
import SHISLogo from '../../../../styles/SHISLogo.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build") {
    require('../../local/landing/LandingStyles/LandingNavBar.scss');
}

function Navigation() {

    const { dimension } = useSelector((state) => state.web);
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const history = useNavigate();

    useEffect(() => {
        if(dimension >= 4){
            setToggleMenu(false)
        }
    }, [dimension])

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
        {
            screenWidth < 768 &&
            <div style={{ position: "absolute", top: 0, width: "100%"}}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "15px"}}>
                <img
                        src={SHISLogo}
                        alt='SHIS Logo'
                        style={{ height: "70px", width: "85px",cursor: "pointer", zIndex: 10 }}
                        onClick={() => {
                            window.open("https://portal.silangmedical.com/", "_blank")
                        }}
                />
                    <Button icon={<MenuOutlined />} size={"large"} style={{ zIndex: 10 }} onClick={() => { setToggleMenu(true) }}></Button>
                </div>
                <Drawer
                    width="100%"
                    closable={false}
                    visible={toggleMenu}
                    className="nav-drawer"
                >
                    <ul style={{ listStyle: "none" }}>
                        {
                            [
                                "Home",
                                "About",
                                "Services",
                                "Locations",
                                "Exit"
                            ].map((nav, key) => {
                                return (
                                    <li 
                                        key={key}
                                    >
                                        <p
                                            onClick={() => {
                                                if(nav === "Exit"){
                                                    setToggleMenu(false)
                                                } else {
                                                    if(window.location !== "") {
                                                        setToggleMenu(false)
                                                        history({
                                                            pathname: `/`
                                                        })
                                                        setTimeout(() => {
                                                            const section = document.querySelector(`#${nav}`);
                                                            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                                        }, 200)
                                                    } else {
                                                        setToggleMenu(false)
                                                        const section = document.querySelector(`#${nav}`);
                                                        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                                    }
                                                }
                                            }}
                                            style={{ color: "white", fontSize: "24px", textAlign: "center", marginLeft: "-10vw" }}
                                        > 
                                            {nav}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Drawer>
            </div>
        }
            {/* Navigation Section of Landing Page */}
            <Row>
                
                <header>
                    <div className="portfolio-hero">
                        <div className="portfolio-menu">

                            {/* Navigation */}
                            <nav className="stroke">

                                {(toggleMenu || screenWidth > 768) && (
                                    <ul className="nav-menu">

                                        {/* NavBar Logo */}
                                        <img src={SHISLogo} alt='SHIS Logo' className="SHISLogo" onClick={() => {
                                            window.open("https://portal.silangmedical.com/", "_blank")
                                        }} style={{ cursor: "pointer" }}/>
                                        <li className="menu-item"><a {...window.location.pathname === "/" ? { href: "#Home"} : { onClick: () => {
                                            history({
                                                pathname: `/#Home`
                                            })
                                        } }} >Home</a></li>
                                        <li className="menu-item"><a {...window.location.pathname === "/" ? { href: "#About"} : { onClick: () => {
                                            history({
                                                pathname: `/#About`
                                            })
                                        } }} >About Us</a></li>
                                        <li className="menu-item"><a {...window.location.pathname === "/" ? { href: "#Services"} : { onClick: () => {
                                            history({
                                                pathname: `/#Services`
                                            })
                                        } }} >Services</a></li>
                                        <li className="menu-item"><a {...window.location.pathname === "/" ? { href: "#Locations"} : { onClick: () => {
                                            history({
                                                pathname: `/#Locations`
                                            })
                                        } }} >Locations</a></li>
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
