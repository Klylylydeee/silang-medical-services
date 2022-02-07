import React from 'react';

//Ant Design
import { Row, Col } from 'antd'

//Scss
import '../../local/landing/LandingStyles/About.scss'

//Image
import TransparentLogo from '../landing/LandingPage-assets/TransparentLogo.png'

function AboutUs() {
    return <div id="About">
        <div className="Background"></div>
        <Row>
            <Col xs={{ span: 24 }}>
                <div className="AboutLayer">
                    <div className="AboutSection">
                        <Col>
                    {/* Left Side */}
                            <div class="AboutTitle">
                                <div className="SmallWhiteDiv"></div>
                                <h1>What is <br />
                                    this About?</h1>
                                <h3>Know about us!</h3>
                            </div>
                        </Col>
                    </div>

                    {/* WhiteDiv bar at the top of about page */}
                    <div className="WhiteDivTop"></div>


                {/* Right Side */}
                    {/* Mission */}
                    <div className="AboutInfo">
                        <Col xs={{ span: 15 }} sm={{ span: 16 }} md={{ span: 14 }} lg={{ span: 14 }} offset={8} id="Mission">
                            <h2>Mission</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
                        </Col>
                        {/* Vision */}
                        <Col xs={{ span: 15 }} sm={{ span: 20 }} md={{ span: 14 }} lg={{ span: 14 }} offset={8} id="Vision">
                            <h2>Vision</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
                        </Col>
                        {/* Core Values */}
                        <Col xs={{ span: 15 }} sm={{ span: 20 }} md={{ span: 14 }} lg={{ span: 14 }} offset={8} id="Core">
                            <h2>Core Values</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
                        </Col>
                    </div>

                    {/* Transparent Background Logo */}
                    <img src={TransparentLogo} alt='SHIS Transparent' className="ShisTransparent" />

                    {/* WhiteDiv bar at the bottom of about page */}
                    <div className="WhiteDiv"></div>
                </div>
            </Col>
        </Row>


    </div >

}

export default AboutUs;
