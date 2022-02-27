import React from 'react'
import SHISLogo from '../../../../styles/SHISLogo.png'

//Ant Design
import { Row, Col } from 'antd'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require('../../local/landing/LandingStyles/Footer.scss');
}

function LandingFooter() {
    return (
        <Row>
            <Col xs={{ span: 15 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <div className="FooterPage">
                    <div className="LogoSection">
                        <Col>
                            <div className="footerImage">
                                {/* SHIS Logo */}
                                <img src={SHISLogo} alt='SHIS Logo' className="Shis-footer-logo" />
                            </div>
                        </Col>
                    </div>

                    <div className="LinkSection">
                        <Col>
                            <ul className="footer-menu">
                                <h1>Useful links</h1>
                                <li className="menu-item"><a href="#Home">Home</a></li>
                                <li className="menu-item"><a href="#About">About Us</a></li>
                                <li className="menu-item"><a href="#Services">Services</a></li>
                                <li className="menu-item"><a href="#Locations">Locations</a></li>
                            </ul>
                        </Col>
                    </div>

                    <div className="ContactSection">
                        <Col>
                            <h1>Contact Us</h1>
                            <h2>(049) 842 8423</h2>
                            <h2>SilangMedical@info.com</h2>
                            <h2>Silang, Cavite</h2>
                        </Col>
                    </div>

                    <div className="DescriptionSection">
                        <Col>
                            <h1 id='FooterTitle'>Silang</h1>
                            <h2 id="SecondTitle">Medical Services</h2>
                            <h3 id="FooterDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </h3>
                        </Col>

                    </div>
                </div>

                <footer>
                    <Col>
                        <div className="FooterLineDiv"></div>
                        <div className="Copyright">
                            <h3>Copyright &copy; 2022 All rights reserved.</h3>
                        </div>
                    </Col>
                </footer>

            </Col>
        </Row>
    )
}

export default LandingFooter