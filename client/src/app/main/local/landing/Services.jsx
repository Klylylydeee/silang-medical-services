import React from 'react';

//Ant Design
import { Col } from 'antd'

//Image
import LaptopPhone from '../landing/LandingPage-assets/LaptopPhone.png'
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require('../../local/landing/LandingStyles/LandingServices.scss');
}

function Services() {
    return <div>
        <Col>
            <div className="ServicesPage">
                {/* Left Side of Services */}
                <div className="ServicesSection" id="Services">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 22 }} xl={{ span: 24 }}>

                        <div className="ServicesTitle">
                            <h1 id="TextOne">Services</h1>
                            <h1 id="TextTwo">We Of<span>fer!</span></h1>
                        </div>

                        <div className="ServicesInfo">
                            {/* Communication */}
                            <Col  id="Communication">
                                <h2>Communication</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, amet sit vero numquam modi itaque officia similique at, quaerat, accusantium ab.</p>
                            </Col>
                            {/* Medical Record */}
                            <Col id="MedicalRecord">
                                <h2>Medical Record</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, amet sit vero numquam modi itaque officia similique at, quaerat, accusantium ab.</p>
                            </Col>
                            {/* Analytics */}
                            <Col id="Analytics">
                                <h2>Analytics</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, amet sit vero numquam modi itaque officia similique at, quaerat, accusantium ab.</p>
                            </Col>
                        </div>
                    </Col>


                    {/* Left Grid Image */}
                    <img src={BlackGrid} alt='Grid Design2' className="black-grid2" />
                </div>


                
                    <div className="ServicesImage">
                        {/* Images seen in Services Section */}
                        <img src={BlackGrid} alt='Grid Design' className="black-grid1" />
                        <img src={LaptopPhone} alt='SHIS laptop' className="LaptopPhone" />
                    </div>

            </div>
        </Col>
    </div>

}

export default Services;
