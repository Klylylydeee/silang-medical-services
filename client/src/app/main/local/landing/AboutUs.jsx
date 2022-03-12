import React from 'react';

//Ant Design
import { Row, Col } from 'antd'

//Image
import TransparentLogo from '../landing/LandingPage-assets/TransparentLogo.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build") {
    require('../../local/landing/LandingStyles/About.scss');
}

function AboutUs() {
    return <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
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

                <div className="AboutInfo" >
                    <Col xl={{ span: 22 }}>
                        <div id="Mission">
                            <h2>Mission</h2>
                            <p>Our mission is to provide an efficient and effective way of medical processing to aid our citizens, 
                                whilst enhancing the technology of barangay clinics that benefits both citizens 
                                and the barangay. </p>
                        </div>

                        {/* Vision */}
                        <div id="Vision">
                            <h2>Vision</h2>
                            <p>We envision to enhance the medical processing and dissimination of information for all the barangays in Silang, Cavite </p>
                        </div>

                        {/* Core Values */}
                        <div id="Core">
                            <h2>Core Values</h2>
                            <p>Quality and Reliability. The core values that Silang Medical Services instills in its use. To be realiable at all times while offering quality of service. </p>
                        </div>
                    </Col>

                </div>



                {/* Transparent Background Logo */}
                <img src={TransparentLogo} alt='SHIS Transparent' className="ShisTransparent" />

                {/* WhiteDiv bar at the bottom of about page */}
                <div className="WhiteDiv"></div>
            </div>
        </Col>
    </Row>
}

export default AboutUs;
