import React from 'react';

//Ant Design
import { Col } from 'antd'

//Image
import LaptopPhone from '../landing/LandingPage-assets/LaptopPhone.png'
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build") {
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
                                <p>Public announcements, health-related reports, and other information to be distributed by SMS and email feature present in the system.</p>
                            </Col>
                            {/* Medical Record */}
                            <Col id="MedicalRecord">
                                <h2>Medical Record</h2>
                                <p>Master Patient Index, a collection of all the patient medical records of each barangay into one or convinience and reliability.</p>
                            </Col>
                            {/* Analytics */}
                            <Col id="Analytics">
                                <h2>Analytics</h2>
                                <p>Analytics is used to determine the current and historical outbreaks of sickness or illness that have affected and continue to affect the citizens of Silang.</p>
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
