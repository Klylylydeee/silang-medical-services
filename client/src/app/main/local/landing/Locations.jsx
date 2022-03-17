import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Row, Col } from "antd"
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

//Images 
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'
import RectangleA from '../landing/LandingPage-assets/RectangleA.png'

SwiperCore.use([Autoplay, Pagination]);

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build") {
    require('../../local/landing/LandingStyles/LandingLocation.scss');
}

    function Locations() {

        const [swipperIndex, setIndex] = useState(1);

    const { dimension } = useSelector((state) => state.web);
    
    const history = useNavigate();

    const paginationSetting = {
        "dynamicMainBullets": true,
        "clickable": true
    }
    const autoplaySettting = {
        "delay": 2500,
        "disableOnInteraction": false
    }

    const swipperData = [
        {
            barangay: "Puting Kahoy",
            image: RectangleA
        },
        {
            barangay: "Lumil",
            image: RectangleA
        }
    ]

        return (
            <div id = "Locations">
                <Row style={{ minHeight: "70vh"}}>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{ backgroundColor: "#ad72b7", display: "flex", justifyContent: "center", flexDirection: "column", padding: dimension >= 4 ? "1.5% 3% 5% 3%" : "5% 3%", marginTop: dimension >= 4 ? "-10%" : "-5%", ...dimension >= 6 ? { alignItems: "left" } : {} }}>
                        <div style={{ maxWidth: "1500px" }}>
                            <p style={{ color: "white", fontSize: "70px", fontWeight: 500, marginBottom: "20px" }}>
                                Barangay
                                <br />
                                <span style={{ paddingLeft: "40px" }}>Clinic Locations</span>
                            </p>
                            <div style={{ paddingLeft: "80px", paddingRight: "80px", paddingTop: 0, marginTop: 0 }}>
                                <p style={{ color: "white", fontSize: "18px", fontWeight: 400, maxWidth: "700px" }}>
                                    Every location that is under the scope of Silang Medical Services is listed in this section. 
                                    You can click which barangay you are part of to check the latest news and announcements.
                                </p>
                            </div>
                        </div>

                        {/* left Grid Image */}
                        <img src={BlackGrid} alt='Grid Design' className="black-gridLoc2" />

                    </Col>

                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <div style={{ height: "100%", position: "relative", padding: "50px" }}>

                            {/* Right Grid Image */}
                            <img src={BlackGrid} alt='Grid Design' className="black-gridLoc" />

                            <Swiper
                                slidesPerView={dimension >= 4 ? 2 : 1}
                                pagination={paginationSetting}
                                autoplay={autoplaySettting}
                                loop={true}
                                spaceBetween={50}
                                onSlideChange={(data) => { setIndex(data.realIndex + 1) }}
                                style={{ overflow: "hidden", position: "absolute", left: dimension >= 4 ? "-20%" : "0%", top: dimension >= 4 ? "30%" : "40%", width: dimension >= 4 ? "100%" : "50%", ...dimension < 4 ? { right: 0 } : {} }}
                            >
                                {
                                    swipperData.map((index, key) => {
                                        return (
                                            <SwiperSlide key={key}>

                                                <div style={{
                                                    position: "relative",
                                                    textAlign: "center",
                                                    color: "white"
                                                }} onClick={() => {
                                                    history({
                                                        pathname: `/barangay-activities/${index.barangay}`
                                                    })
                                                }}>
                                                    <img src={RectangleA} alt="" style={{ maxWidth: "100%", padding: 0, margin: 0 }} />
                                                    <p style={{
                                                        color: "white",
                                                        position: "absolute",
                                                        bottom: "-20px",
                                                        left: "16px"
                                                    }}
                                                    >
                                                        {index.barangay}
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <p style={{ position: "absolute", left: "-20%", bottom: 0, color: "white", fontWeight: 600 }} >
                                0{swipperIndex}/0{swipperData.length}
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }

    export default Locations;
