import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button, Drawer } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import LandingLogo from "./LandingLogo.png";
import { useNavigate  } from "react-router-dom";
import "./Landing.scss";

const TestNav = () => {
    const history = useNavigate();
    const { dimension } = useSelector((state) => state.web);
    const [toggleMenu, setToggleMenu] = useState(false);
    useEffect(() => {
        if(dimension >= 4){
            setToggleMenu(false)
        }
    }, [dimension]);
    return (
        <div style={{ position: "absolute", zIndex: 50, width: "100%" }}>
            {
                dimension >= 3 &&
                <Row style={{ width: "100%" }}>
                    <Col xs={{ span: 24}} md={{ span: 18 }} lg={{ span: 12}}>
                        <Row>
                            <Col xs={{ span: 4 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img src={LandingLogo} alt="" style={{ height: "80px" }} onClick={() => {
                                    window.open("https://portal.silangmedical.com", "_blank")
                                }}/>
                            </Col>
                            <Col xs={{ span: 5 }} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="hover-underline-animation" style={{ color: window.location.pathname === "/" ? "black" : "white", fontSize: "18px", paddingTop: "15px", fontWeight: 500 }}
                                    onClick={() =>{
                                        if(window.location.pathname === "/"){
                                            const section = document.querySelector('#home');
                                            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                        } else {
                                            history({
                                                pathname: "/"
                                            });
                                            setTimeout(() => {
                                                const section = document.querySelector(`#home`);
                                                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                            }, 200)
                                        }
                                    }}
                                >
                                    Home
                                </p>
                            </Col>
                            <Col xs={{ span: 5 }} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="hover-underline-animation" style={{ color: window.location.pathname === "/" ? "black" : "white", fontSize: "18px", paddingTop: "15px", fontWeight: 500 }}
                                    onClick={() =>{
                                        if(window.location.pathname === "/"){
                                            const section = document.querySelector('#about');
                                            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                        } else {
                                            history({
                                                pathname: "/"
                                            });
                                            setTimeout(() => {
                                                const section = document.querySelector(`#about`);
                                                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                            }, 200)
                                        }
                                    }}
                                >
                                    About Us
                                </p>
                            </Col>
                            <Col xs={{ span: 5 }} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="hover-underline-animation" style={{ color: window.location.pathname === "/" ? "black" : "white", fontSize: "18px", paddingTop: "15px", fontWeight: 500 }}
                                    onClick={() =>{
                                        if(window.location.pathname === "/"){
                                            const section = document.querySelector('#services');
                                            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                        } else {
                                            history({
                                                pathname: "/"
                                            });
                                            setTimeout(() => {
                                                const section = document.querySelector(`#services`);
                                                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                            }, 200)
                                        }
                                    }}
                                >
                                    Services
                                </p>
                            </Col>
                            <Col xs={{ span: 5 }} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p className="hover-underline-animation" style={{ color: window.location.pathname === "/" ? "black" : "white", fontSize: "18px", paddingTop: "15px", fontWeight: 500 }}
                                    onClick={() =>{
                                        if(window.location.pathname === "/"){
                                            const section = document.querySelector('#locations');
                                            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                        } else {
                                            history({
                                                pathname: "/"
                                            });
                                            setTimeout(() => {
                                                const section = document.querySelector(`#locations`);
                                                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                            }, 200)
                                        }
                                    }}
                                >
                                    Locations
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={{ span: 10 }} >
                    </Col>
                </Row>
            }
            {
                dimension < 3 &&
                <Row style={{ padding: "0px 25px", width: "100vw", zIndex: 50 }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                        <img src={LandingLogo} alt="" style={{ height: "80px" }} onClick={() => {
                            window.open("https://portal.silangmedical.com", "_blank")
                        }}/>
                    </Col>
                    <Col span={12} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <Button icon={<MenuOutlined />} size={"large"} style={{ zIndex: 30, marginRight: "25px" }} onClick={() => {  setToggleMenu(true) }}></Button>
                    </Col>
                </Row>
            }
            <Drawer
                    width="100%"
                    closable={false}
                    visible={toggleMenu}
                    className="nav-drawer"
            >
                    <ul style={{ listStyle: "none" }}>
                        {
                            [
                                "home",
                                "about",
                                "services",
                                "locations",
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
                                            {nav.charAt(0).toUpperCase() + nav.slice(1)}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
            </Drawer>
        </div>
    );
};

export default TestNav;
