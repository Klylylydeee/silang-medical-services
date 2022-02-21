import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Row, Col } from "antd"
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { useSelector } from "react-redux";

import image from "./swiperImg.png"

import "swiper/swiper.min.css";

SwiperCore.use([Autoplay, Pagination]);

const TestSwiper = () => {

    const [swipperIndex, setIndex] = useState(1);

    const { dimension } = useSelector((state) => state.web); 

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
            image: image
        },
        {
            barangay: "Lumil",
            image: image
        }
    ]

    return (
        <div>
            <Row style={{ minHeight: "75vh" }}>
                <Col xs={{ span: 24}} lg={{ span: 16 }} style={{ backgroundColor: "violet", display: "flex", justifyContent: "center", flexDirection: "column", padding: dimension >= 4 ? "1.5% 3% 5% 3%" : "5% 3%", marginTop: dimension >= 4 ? "-10%" : "-5%", ...dimension >= 6 ? { alignItems: "center" } : {  }}}>
                    <div style={{ maxWidth: "1500px" }}>
                        <p style={{ color: "white", fontSize: "48px", fontWeight: 500, marginBottom: "20px"}}>
                            Barangay 
                            <br />
                            <span style={{paddingLeft: "40px"}}>Clinic Locations</span>
                        </p>
                        <div style={{ paddingLeft: "80px", paddingTop: 0, marginTop: 0 }}>
                            <p style={{ color: "white", fontSize: "16px", fontWeight: 400, maxWidth: "500px"}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id.
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs={{ span: 24}} lg={{ span: 8 }}>
                    <div style={{ height: "100%", position: "relative", padding: "50px" }}>
                        <Swiper 
                            slidesPerView={dimension >= 4 ? 2 : 1} 
                            pagination={paginationSetting} 
                            autoplay={autoplaySettting}
                            loop={true}
                            spaceBetween={50}
                            onSlideChange={(data) => { setIndex(data.realIndex+1) }}
                            style={{ overflow: "hidden", position: "absolute", left: dimension >= 4 ? "-20%" : "0%", top: dimension >= 4 ? "30%" : "40%", width: dimension >= 4 ? "100%" : "50%", ...dimension < 4 ? { right: 0 } : {  } }} 
                        >
                            {
                                swipperData.map((index, key) => {
                                    return (
                                        <SwiperSlide key={key}>
                                            <div style={{
                                                position: "relative",
                                                textAlign: "center",
                                                color: "white"
                                            }} > 
                                                <img src={image} alt="" style={{ maxWidth: "100%", padding: 0, margin: 0 }}/>
                                                <p style={{ color: "white",
                                                    position: "absolute",
                                                    bottom: "-20px",
                                                    left: "16px" }}
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

export default TestSwiper