import React from 'react';

//Ant Design
import { Row, Col } from 'antd'

//Image
import laptop1 from '../landing/LandingPage-assets/laptop1.png'
import Phone1 from '../landing/LandingPage-assets/Phone1.png'
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'

//Scss
import "../../local/landing/LandingStyles/LandingServices.scss"


function Services() {
    return <div className="ServicesPage">
        <div id="Services">
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 16 }} lg={{ span: 12 }}>
                    {/* Services Title */}
                    <Col>
                        <div className="ServicesTitle">
                            <h1 id="TextOne">Services</h1>
                            <h1 id="TextTwo">We Offer!</h1>
                        </div>
                        <div className="SmallBlackDiv"></div>
                    </Col>

                    <Col>
                        <div className="ServicesInfo">
                            {/* Communication */}
                            <Col span={16} offset={4} id="Communication">
                                <h2>Communication</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, amet sit vero numquam modi itaque officia similique at, quaerat, accusantium ab.</p>
                            </Col>
                            {/* Medical Record */}
                            <Col span={16} offset={4} id="MedicalRecord">
                                <h2>Medical Record</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, amet sit vero numquam modi itaque officia similique at, quaerat, accusantium ab.</p>
                            </Col>
                            {/* Analytics */}
                            <Col span={16} offset={4} id="Analytics">
                                <h2>Analytics</h2>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, amet sit vero numquam modi itaque officia similique at, quaerat, accusantium ab.</p>
                            </Col>
                        </div>
                    </Col>
                </Col>

                {/* Images seen in Services Section */}
                    <img src={BlackGrid} alt='Grid Design' className="black-grid1" />
                    <img src={laptop1} alt='SHIS laptop' className="Laptop1" />
                    <img src={Phone1} alt='SHIS phone' className="Phone" />
                    <img src={BlackGrid} alt='Grid Design2' className="black-grid2" />
        
            </Row>
        </div>


    </div>;
}

export default Services;
