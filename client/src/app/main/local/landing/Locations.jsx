import React from 'react';

//Ant Design
import { Row, Col } from 'antd'
import { Carousel } from 'antd';

//Images 
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'
import RectangleA from '../landing/LandingPage-assets/RectangleA.png'

//Styles
if(process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require( '../../local/landing/LandingStyles/LandingLocation.scss');
}

function Locations() {

    return (
        <Row>
            <Col xs={{ span: 15 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 24 }}>
                <div className="LocationMain" id="Locations">

                    {/* Left Side Barangay Info */}
                    <div className="LocLeft">
                        {/* Location Title Title */}
                        <div className="BarangayInfo">
                            <h1 id="BarangayTitle1">Barangay</h1>
                            <h1 id="BarangayTitle2">Clinic Locations</h1>
                            <h3 id="BarangayDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </h3>
                        </div>
                    </div>

                    {/* Right Side Carousel */}
                    <div className="BarangayCarousel">
                            {/* Images seen in Location Section */}
                            <img src={BlackGrid} alt='Grid Design' className="black-gridLoc" />
                    </div>
                </div>
            </Col >
        </Row >

    )
}

export default Locations;
