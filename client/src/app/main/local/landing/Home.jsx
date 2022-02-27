import React from 'react'
import Navigation from './Navigation'
import AboutUs from './AboutUs'
import Services from './Services'
import Locations from './Locations'
import LandingForm from './LandingForm'

//Ant Design
import { Row, Col } from 'antd'

//Image
import PurpleLogo from '../landing/LandingPage-assets/PurpleLogo.png'
import Vector1A from '../landing/LandingPage-assets/Vector1A.png'
import LandingFooter from './LandingFooter'

//Styles
if(process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require( '../../local/landing/LandingStyles/LandingPage.scss');
}

function Home() {
    return (
        <div className='landing'>
                {/* Navigation Section of Landing Page */}
                <Row span={14}>
                    <Navigation />
                </Row>

                {/* Purple Background Logo */}
                <img src={PurpleLogo} alt='SHIS PurpleLogo' className="ShisPurple" />

                {/* Home Page Title */}
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 24 }} lg={{ span: 16 }} offset={2}>
                        <div className="Home">
                            <div className="HomeTitle">
                                <h1 id='LandingTitle'>Silang</h1>
                                <h2 id="SecondaryTitle">Medical Services</h2>
                                <h3 id="LandingDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Suspendisse et volutpat turpis, a sagittis nisl.
                                    Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </h3>
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
