import React from 'react'
import Navigation from './Navigation'
import AboutUs from './AboutUs'
import Services from './Services'
import Locations from './Locations'
import LandingForm from './LandingForm'
import LandingFooter from './LandingFooter'

//Ant Design
import { Row, Col } from 'antd'

//Image
import PurpleLogo from '../landing/LandingPage-assets/PurpleLogo.png'
import Vector1A from '../landing/LandingPage-assets/Vector1A.png'



//Styles
if(process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require( '../../local/landing/LandingStyles/LandingPage.scss');
}

function Home() {
    return (
        <div className='landing'>
                {/* Navigation Section of Landing Page */}
                <div>
                    <Navigation />
                </div>

                {/* Purple Background Logo */}
                <img src={PurpleLogo} alt='SHIS PurpleLogo' className="ShisPurple" />

                {/* Home Page Title */}
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }} >
                        <div className="Home" id="Home">
                            <div className="HomeTitle">
                                <h1 id='LandingTitle'>Silang</h1>
                                <h2 id="SecondaryTitle">Medical Services</h2>
                                <h3 id="LandingDescription">
                                        A technological leap from our standard medical processing in our barangay. to aid Barangay Officials and 
                                          Health workers with health related record handling, monitoring and 
                                          event handling.                                              
                                     </h3>
                            </div>
                        </div>
                    </Col>

                    <section id="section07" class="demo">
                        {/* Redirect to About */}
                        <a href="#About">Learn More<span></span><span></span><span></span></a>
                    </section>

                    <div>
                        <img src={Vector1A} alt='Image1' className="VectorImage1" />
                    </div>

                </Row>

                <Col>
                    {/* About Section */}
                    <AboutUs />
                </Col>
                 {/* Services Section */}
                 <Col>
                    <Services />
                </Col>

                {/* Locations Section */}
                <Col>
                     <Locations />                
                </Col>

                {/* Landing Form */}
                <Col>
                    <LandingForm />
                </Col>
                
                {/* Landing Page Footer */}
                <Col>
                    <LandingFooter />
                </Col>
        </div>


    )
}

export default Home
