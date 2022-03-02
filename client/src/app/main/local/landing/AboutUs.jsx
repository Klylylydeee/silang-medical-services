import React from 'react';

//Ant Design
import { Row, Col } from 'antd'

//Image
import TransparentLogo from '../landing/LandingPage-assets/TransparentLogo.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require('../../local/landing/LandingStyles/About.scss');
}

function AboutUs() {
    return<Row>
            <Col xs={{ span: 24 }}>
                <div className="AboutLayer" id="About">
                    <div className="AboutSection">
                        {/* Left Side */}
                        <div class="AboutTitle">
                            <div className="SmallWhiteDiv"></div>
                            <h1>What is <br />
                                this About?</h1>
                            <h3>Know about us!</h3>
                        </div>
                    </div>

                    {/* WhiteDiv bar at the top of about page */}
                    <div className="WhiteDivTop"></div>

                    {/* Right Side */}
                    {/* Mission */}
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 10 }} xl={{ span: 11 }}>
                        <div className="AboutInfo" >
                            <Col>
                                <div id="Mission">
                                    <h2>Mission</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse et volutpat turpis, a sagittis nisl.
                                        Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
                                </div>

                                {/* Vision */}
                                <div id="Vision">
                                    <h2>Vision</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse et volutpat turpis, a sagittis nisl.
                                        Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
                                </div>

                                {/* Core Values */}
                                <div id="Core">
                                    <h2>Core Values</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse et volutpat turpis, a sagittis nisl.
                                        Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
                                </div>
                            </Col>

                        </div>
                    </Col>


                    {/* Transparent Background Logo */}
                    <img src={TransparentLogo} alt='SHIS Transparent' className="ShisTransparent" />

                    {/* WhiteDiv bar at the bottom of about page */}
                    <div className="WhiteDiv"></div>
                </div>
            </Col>
        </Row>
}

export default AboutUs;
