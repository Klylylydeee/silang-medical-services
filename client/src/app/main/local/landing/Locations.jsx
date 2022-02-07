import React from 'react';

//Ant Design
import { Row, Col } from 'antd'
import { Carousel } from 'antd';

//Styles
import "../../local/landing/LandingStyles/LandingLocation.scss"

//Images 
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'
import RectangleA from '../landing/LandingPage-assets/RectangleA.png'

function Locations() {
    return <div id="Locations">
        <Row style={{position: "relative"}}>

            <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 20 }} lg={{ span: 16 }}>
                <div className="LocationMain">
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
                </div>
            </Col>

            {/* Images seen in Location Section */}
            <img src={BlackGrid} alt='Grid Design' className="black-gridLoc" />

            {/* Right Side Carousel */}
            <Carousel>
                <div className="BarangayCarousel">
                    <div>
                        <img src={RectangleA} alt="BarangayImage1" className="ImageCaro" />
                    </div>
                </div>
            </Carousel>
        </Row>
    </div >

}

export default Locations;
