import React, { useState, useEffect } from "react";
import PinInput from "react-pin-input";
import LandingImageP1 from "./LandingImagePart1.png";
import LandingImageP2 from "./LandingImagePart2.png";
import LandingLogo from "./LandingLogo.png";
import LandingVector from "./LandingVector.png";
import AboutVector from "./AboutVector.png";
import AboutLine from "./AboutLine.png";
import ServiesLine from "./ServiesLine.png";
import ServicesDevice from "./ServicesDevice.png";
import ServicesGrid from "./ServicesGrid.png";
import LocationImage from "./LocationImage.png";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";

import TestNav from "./TestNav";
import "./Landing.scss"

SwiperCore.use([Autoplay, Pagination]);

const TestPublic = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { dimension } = useSelector((state) => state.web);
    const [innerHeight, setInnerHeight] = useState("0px");
    const [offSet, setOffSet] = useState("0px");
    const [swipperIndex, setIndex] = useState(1);
    const [formStep, setFormStep] = useState(1);
    const [submissionData, setSubmissionData] = useState({});
    const [pinCode, setPinCode] = useState("");
    const [verificationCode, setVerificaitonCode] = useState("");
    const [disabledForm, setDisabledForm] = useState(false)

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
            image: LocationImage
        },
        {
            barangay: "Lumil",
            image: LocationImage
        }
    ]

    const createAuth = (email, barangay, phone_number, pin) => {
        const token = jwt.sign({
            email: email,
            barangay: barangay,
            phone_number: phone_number,
            pin: pin
        }, process.env.REACT_APP_JWT_BACKEND, {
            expiresIn: "1h",
            algorithm: "HS512"
        });
        return token
    };

    const onFinish = (values) => {
        const phone_number = values.prefix + values.phone_number;
        const authToken = createAuth(values.email, values.barangay, phone_number, values.pin)
        history({
            pathname: `/medical-record?auth=${authToken}`
        })
    };

    const sendPinRequest = async (formData) => {
        try {
            dispatch(changeLoader({ loading: true }))
            const sendVerifyOTP = await axiosAPI.post(`medical-record/public/verify-record-list`, {
                email: formData.email,
                phone_number: formData.prefix + formData.phone_number,
                barangay: formData.barangay,
                pin: formData.pin
            });
            setVerificaitonCode(`${sendVerifyOTP.data.pinLoad}`)
            dispatch(changeLoader({ loading: false }));
            toasterRequest({ payloadType: "success", textString: sendVerifyOTP.data.message});
            setFormStep(2)
            setSubmissionData(formData)
        } catch(err){
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message === "jwt expired" ? "Authentication expired" : "Authentication incorrect!"})
            :
                toasterRequest({ payloadType: "error", textString: err.message === "jwt expired" ? "Authentication expired" : "Authentication incorrect!"});
        }
    }

    const verifyPIN = () => {
        if(verificationCode === pinCode) {
            onFinish(submissionData)
        } else {
            if(localStorage.getItem("public-authorization")){
                const token = jwt.decode(localStorage.getItem("public-authorization"))
                localStorage.removeItem("public-authorization")
                const newToken = jwt.sign({
                    count: token.count + 1
                }, process.env.REACT_APP_JWT_BACKEND, {
                    expiresIn: "1h",
                    algorithm: "HS512"
                });
                localStorage.setItem("public-authorization", newToken)
                if(token.count + 1 >= 3){
                    setDisabledForm(true)
                    toasterRequest({ payloadType: "error", textString: "You have attempted the max attempt. Please wait for a few hours."})
                } else {
                    toasterRequest({ payloadType: "error", textString: "Incorrect Verificaiton PIN."})
                }
            } else {
                const token = jwt.sign({
                    count: 1
                }, process.env.REACT_APP_JWT_BACKEND, {
                    expiresIn: "1h",
                    algorithm: "HS512"
                });
                localStorage.setItem("public-authorization", token)
                toasterRequest({ payloadType: "error", textString: "Incorrect Verificaiton PIN."})
            }
        }
    }

    useEffect(() => {
        const checkPayload = async () => {
            try {
                if(localStorage.getItem("public-authorization")){
                    await jwt.verify(localStorage.getItem("public-authorization"), process.env.REACT_APP_JWT_BACKEND);
                    let tokenData = await jwt.decode(localStorage.getItem("public-authorization"));
                    if(tokenData.count >= 3){
                        setDisabledForm(true);
                    }
                }
            } catch(err){
                localStorage.removeItem("public-authorization");
                setDisabledForm(false);
            }
        }
        checkPayload()
    }, [])
    
    useEffect(() => {
        // Handler to call on window resize
          const handleResize = () => {
                // Set window width/height to state
                setTimeout(() => {
                    
                    setInnerHeight(`${window.innerHeight}px`);
                    if(document.getElementById("rightWing")){
                        let rightWing = document.getElementById("rightWing").offsetWidth
                        let leftWing = document.getElementById("leftWing").offsetWidth
                        setOffSet(`${(rightWing / window.innerWidth * 100) + (.30 * leftWing)  }px`)
                        // setOffSet(`${rightWing / window.innerWidth * 60}%`)
                    }
                }, 250)
          }
          // Add event listener
          window.addEventListener("resize", handleResize);
          // Call handler right away so state gets updated with initial window size
          handleResize();
          // Remove event listener on cleanup
          return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div style={{ overflow: "hidden", position: "relative" }}>
            <Helmet>
                <title>Silang Medical Services</title>
                <meta name="description" content="Silang Medical Services provides the latest medical events and announcements through a centralized database that contains medical record in Silang, Cavite."/>
            </Helmet>
            <TestNav />
            <div
                id="home"
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    backgroundImage: `url(${LandingVector})`,
                    backgroundRepeat: "no-repeat no-repeat",
                    backgroundSize: dimension >= 4 ? "60vh" : "300px",
                    backgroundPositionY: "3vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <p style={{ fontSize: "68px", fontWeight: 500, color: "#AD72B7", padding: dimension >= 4 ? "0 2vw" : "150px 25px 0px 25px", zIndex: 25 }}>
                    Silang <span style={{ color: "black", display: dimension >= 4 ? "block" : "inline-block" }} >
                        Medical Services
                    </span>
                    <span style={{ color: "black", fontSize: "18px", maxWidth: dimension >= 3 ? "600px" : "none", display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >= 4 ? "3vw" : "0px"}} >
                        A technological leap from our standard medical processing in our barangay. to aid Barangay Officials and Health workers with health related record handling, monitoring and event handling.
                    </span>
                </p>
                {
                    dimension >= 4 &&
                    <img src={LandingImageP1} alt="" id="leftWing" style={{ position: "absolute", height: innerHeight, width: `auto`, top: 0, right: offSet, zIndex: 10 }}/>
                }
                {
                    dimension >= 4 &&
                    <img src={LandingImageP2} alt="" id="rightWing" style={{ position: "absolute", height: `calc(${innerHeight} + 10vh)`, width: `auto`, top: 0, right: 0, zIndex: 10, background: `linear-gradient(110deg, transparent 50%, white 50%)`}}/>
                }
                <p style={{ position: "absolute", left: 0, bottom: 0, padding: dimension >= 4 ? "0 2vw" : "0px 25px", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}
                onClick={() => {
                    const section = document.querySelector('#about');
                    section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                }}>
                    {
                        "Learn More".split("").map((text, key) => {
                            return (
                                <span style={{ display: dimension >= 4 ? "block" : "inline-block"}} key={key}>
                                    {text}
                                </span>
                            )
                        })   
                    }
                </p>
            </div>
            <div
                id="about"
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#AD72B7",
                    color: "white",
                    backgroundImage: `url(${AboutVector})`,
                    backgroundRepeat: "no-repeat no-repeat",
                    backgroundSize: dimension >= 4 ? "65vh" : "300px",
                    backgroundPositionY: dimension >=4 ? "bottom" : "center",
                    backgroundPositionX: "17vw"
                }}
            >
                <Row style={{ padding: dimension >= 4 ? "13vh 2vw" : "13vh 25px"}}>
                    <Col lg={{ span: 12 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p style={{ fontSize: "68px", position: "relative", fontWeight: 500 }}>
                            What is <span style={{display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "6vw" : "0" }}> 
                            this About? 
                            </span> <span style={{ fontSize:"28px", fontWeight: 300, display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "12vw" : "0"}}>
                                Know About us!
                            </span>
                            <img src={AboutLine} alt="" style={{ position: "absolute", top: 0, left: -20, width: "60px" }}/>
                        </p>
                    </Col>
                    <Col lg={{ span: 12 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: dimension >= 4 ? "10vh" : "0vh" }}>
                        <Row >
                            <p style={{ fontSize: "34px", fontWeight: 500, padding: 0, margin: 0 }}>Mission</p>
                        </Row>
                        <Row >
                            <p style={{ fontSize: "18px", padding: dimension >=4 ? "0 10vw 0 1vw" : "0vw"  }}>Our mission is to provide an efficient and effective way of medical processing to aid our citizens, whilst enhancing the technology of barangay clinics that benefits both citizens and the barangay. </p>
                        </Row>
                        <Row style={{ paddingTop: "20px"}}>
                            <p style={{ fontSize: "34px", fontWeight: 500, padding: 0, margin: 0  }}>Vision</p>
                        </Row>
                        <Row >
                            <p style={{ fontSize: "18px", padding: dimension >=4 ? "0 10vw 0 1vw" : "0vw"  }}>We envision to enhance the medical processing and dissimination of information for all the barangays in Silang, Cavite.</p>
                        </Row>
                        <Row style={{ paddingTop: "20px"}}>
                            <p style={{ fontSize: "34px", fontWeight: 500, padding: 0, margin: 0  }}>Core Values</p>
                        </Row>
                        <Row >
                            <p style={{ fontSize: "18px", padding: dimension >=4 ? "0 10vw 0 1vw" : "0vw"  }}>Quality and Reliability. The core values that Silang Medical Services instills in its use. To be realiable at all times while offering quality of service.</p>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div
                id="services"
                style={{
                    minHeight: "100vh",
                }}
            >
                <Row style={{ padding: dimension >= 4 ? "13vh 2vw" : "13vh 25px"}}>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ position: "relative", marginBottom: "10vh" }}>
                        <Row>
                            <Col>
                                <p style={{ fontSize: "68px", position: "relative", fontWeight: 500 }}>
                                    Services <span style={{display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "6vw" : "0" }}> 
                                    We Offer</span>
                                    <img src={ServiesLine} alt="" style={{ position: "absolute", bottom: 0, right: -20, width: "120px" }}/>
                                </p>
                            </Col>
                            <Col style={{ paddingLeft: dimension >= 4 ? "13vh" : "0vh" }}>
                                <Row >
                                    <p style={{ color: "#AD72B7", fontSize: "34px", fontWeight: 500, padding: 0, margin: 0 }}>Communication</p>
                                </Row>
                                <Row >
                                    <p style={{ fontSize: "18px" }}>Public announcements, health-related reports, and other information to be distributed by SMS and email feature present in the system.</p>
                                </Row>
                            </Col>
                            <Col style={{ paddingLeft: dimension >= 4 ? "13vh" : "0vh" }}>
                                <Row >
                                    <p style={{ color: "#AD72B7", fontSize: "34px", fontWeight: 500, padding: 0, margin: 0 }}>Medial Record and Analytics</p>
                                </Row>
                                <Row >
                                    <p style={{ fontSize: "18px" }}>Master Patient Index, a collection of all the patient medical records of each barangay into one or convinience and reliability.</p>
                                </Row>
                            </Col>
                            <Col style={{ paddingLeft: dimension >= 4 ? "13vh" : "0vh" }}>
                                <Row >
                                    <p style={{ color: "#AD72B7", fontSize: "34px", fontWeight: 500, padding: 0, margin: 0 }}>Event Listing</p>
                                </Row>
                                <Row >
                                    <p style={{ fontSize: "18px", }}>Analytics is used to determine the current and historical outbreaks of sickness or illness that have affected and continue to affect the citizens of Silang.</p>
                                </Row>
                            </Col>
                        </Row>
                        <img src={ServicesGrid} alt="" style={{ position: "absolute", height: "15%", width: "auto", ...(dimension >= 4) ? {bottom: "-15%"} : {top: "0"}, right: "-5%" }}/>
                    </Col>
                    <Col lg={{ span: 12 }} style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: dimension >= 4 ? "10vh" : "0vh" }}>
                        <img src={ServicesDevice} alt="" style={{ height: "80%", width: "80%", objectFit: "contain" }}/>
                        <img src={ServicesGrid} alt="" style={{ position: "absolute", ...(dimension >= 4) ? {height: "15%"} : {height: "25%"}, width: "auto", top: 0, right: 0 }}/>
                    </Col>
                </Row>
            </div>
            <div
                id="locations"
                style={{
                    color: "white"
                }}
            >
                <Row style={{
                    minHeight: "80vh",
                }}>
                    <Col lg={{ span: 16 }} style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#AD72B7", padding: dimension >= 4 ? "13vh 2vw" : "13vh 25px" }}>
                        <p style={{ fontSize: "68px", position: "relative", fontWeight: 500 }}>
                            Barangay<span style={{display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "6vw" : "0" }}> 
                            Clinic Locations
                            </span> <span style={{ maxWidth: "80%", fontSize:"18px", fontWeight: 300, display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "12vw" : "0"}}>
                            Every location that is under the scope of Silang Medical Services is listed in this section. You can click which barangay you are part of to check the latest news and announcements.
                            </span>
                        </p>
                        {
                            dimension > 4  &&
                            <img src={ServicesGrid} alt="" style={{ position: "absolute", bottom: "-10%", left: "20%", height: "15%", width: "auto" }}/>
                        }
                        {
                            dimension < 4 &&
                            <div>
                                <Swiper 
                                    slidesPerView={2} 
                                    pagination={paginationSetting} 
                                    autoplay={autoplaySettting}
                                    loop={true}
                                    spaceBetween={50}
                                    onSlideChange={(data) => { setIndex(data.realIndex+1) }}
                                >
                                    {
                                        swipperData.map((index, key) => {
                                            return (
                                                <SwiperSlide key={key}>
                                                    <div style={{
                                                        position: "relative",
                                                        textAlign: "center",
                                                        color: "white",
                                                        height: "auto",
                                                        width: "40vw"
                                                    }}  onClick={() => {
                                                        history({
                                                            pathname: `/barangay-activities/${index.barangay}`
                                                        })
                                                    }}>
                                                        <img src={index.image} alt="" style={{ maxWidth: "100%", padding: 0, margin: 0 }}/>
                                                        <p style={{ color: "white",
                                                            position: "absolute",
                                                            fontSize: "18px",
                                                            bottom: 0,
                                                            left: "10%",
                                                            fontWeight: 500,
                                                            zIndex: 100
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
                            </div>
                        }
                    </Col>
                    <Col xs={{ span: 0 }}lg={{ span: 8 }}>
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
                                                }}  onClick={() => {
                                                    history({
                                                        pathname: `/barangay-activities/${index.barangay}`
                                                    })
                                                }}> 
                                                    <img src={index.image} alt="" style={{ maxWidth: "100%", padding: 0, margin: 0 }}/>
                                                    <p style={{ color: "white",
                                                        position: "absolute",
                                                        bottom: "-20px",
                                                        left: "16px",
                                                        fontSize: "18px",
                                                        fontWeight: 500
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
            <div
                id="medical-record"
            >
                <Row style={{ minHeight: dimension >= 4 ? "100vh" : "0vh", padding: dimension >= 4 ? "13vh 2vw" : "13vh 25px"}}>
                    <Col xs={{ span: 24}} lg={{ span: 12 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p style={{ color: "#AD72B7", fontSize: "68px", fontWeight: 500 }}>
                            Citizen <span style={{ color: "black", display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "6vw" : "0" }}> 
                                Medical Records</span>  <span style={{ color: "black", fontSize:"18px", fontWeight: 300, display: dimension >= 4 ? "block" : "inline-block", paddingLeft: dimension >=4 ? "12vw" : "0"}}>
                                If you have any concerns or problems that you would like to be addressed, feel free to contact us and leave an email. We would be more than happy to respond to you. Thank you and have a nice day! 
                            </span>
                        </p>
                    </Col>
                    <Col xs={{ span: 24}} lg={{ span: 12 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: dimension >= 4 ? "10vh" : "0vh" }}>
                        {
                            formStep === 1 &&
                            <Form
                                onFinish={sendPinRequest}
                                layout="vertical"
                                style={{
                                    padding: dimension >= 4 ? "0 15%" : "0 25px",
                                    position: "relative"
                                }}
                            >
                                <img src={ServicesGrid} alt="" style={{ position: "absolute", height: "25%", width: "auto", bottom: 0, right: 0 }}/>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="EmailForm"
                                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: "Incorrect email format!" }]}
                                >
                                    <Input disabled={disabledForm} />
                                </Form.Item>
                                <Form.Item
                                    name="phone_number"
                                    label="Phone Number"
                                    tooltip="Individual's personal/private Phone Number"
                                    rules={[
                                        {
                                            message: "PH Number should start with 639 + the 9 numbers!",
                                            pattern: new RegExp(/^(\w{9})$/ )
                                        },
                                        {
                                            required: true,
                                            message: "Please fill out this field!",
                                        },
                                    ]}
                                    required={true}
                                >
                                    <Input disabled={disabledForm} addonBefore={(
                                        <Form.Item name="prefix" noStyle initialValue={"639"}>
                                            <Select >
                                                <Select.Option value="639">+639</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    )} />
                                </Form.Item>
                                <Form.Item
                                    label="Barangay"
                                    name="barangay"
                                    rules={[{ required: true, message: 'Please input your barangay!' }]}
                                >
                                    <Select disabled={disabledForm}>
                                        <Select.Option value="Lumil">Lumil</Select.Option>
                                        <Select.Option value="Puting Kahoy">Puting Kahoy</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Unique Identifier"
                                    name="pin"
                                    rules={[{ required: true, message: 'Please input a unique pin!' }, { pattern: "^[0-9]+$", message: "PIN does match the needed pattern"}, { len: 6, message: "PIN should be length of 6 numbers"}]}
                                >
                                    <Input disabled={disabledForm} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" disabled={disabledForm}>
                                        Search Record
                                    </Button>
                                </Form.Item>
                            </Form>
                        }
                        {
                            formStep === 2 &&
                            <div
                                style={{
                                    padding: dimension >= 4 ? "0 15%" : "0 25px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <p>An OTP verification pin has been sent to your email and phone address. Once received, please verify through the pin input below:</p>
                                <PinInput
                                    length={6}
                                    focus={true}
                                    onChange={(pin) => { setPinCode(pin)  }}
                                    type="numeric"
                                    inputMode="number"
                                    inputStyle={{ borderColor: 'black' }}
                                    inputFocusStyle={{ borderColor: '#AD72B7' }}
                                    autoSelect={true}
                                    regexCriteria={/^[0-9]*$/}
                                />
                                <Row align="middle" justify="center"  gutter={[50, 50]} style={{ width: "100%", marginTop: "20px"}}>
                                    <Col>
                                        <Button type="primary" htmlType="submit" onClick={() => { setFormStep(1) }}>
                                            Return to Form
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary" htmlType="submit" disabled={disabledForm === false ? pinCode.length !== 6 ? true : false : true } onClick={() => { verifyPIN() }}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </div>

                        }
                    </Col>
                </Row>
            </div>
            <div
                id="footer"
                style={{
                    backgroundColor: "#AD72B7",
                    color: "white"
                }}
            >
                <Row style={{ padding: dimension >= 4 ? "8vh 2vw 3vh 2vw" : "5vh 25px"}}>
                    <Row gutter={[24, 48]}>
                        <Col xs={{ span: 24 }} lg={{ span: 5 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={LandingLogo} alt="" id="leftWing" style={{ height: "auto", width: dimension >= 4 ? "60%" : "30%", objectFit: "contain" }}
                                onClick={()=>{
                                    window.open("https://portal.silangmedical.com", "_blank")
                                }}
                            />
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 5 }} >
                            <Row>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontWeight: 700, fontSize: "18px" }}>Useful Links</p>
                                </Col>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontSize: "14px", cursor: "pointer"  }} onClick={() => {
                                        const section = document.querySelector(`#home`);
                                        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                    }}>Home</p>
                                </Col>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontSize: "14px", cursor: "pointer"  }} onClick={() => {
                                        const section = document.querySelector(`#about`);
                                        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                    }}>About Us</p>
                                </Col>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontSize: "14px", cursor: "pointer"  }} onClick={() => {
                                        const section = document.querySelector(`#services`);
                                        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                    }}>Services</p>
                                </Col>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => {
                                        const section = document.querySelector(`#locations`);
                                        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                                    }}>Locations</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 5 }} >
                            <Row>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontWeight: 700, fontSize: "18px" }}>Contact Us</p>
                                </Col>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontSize: "14px" }}>silangmedicalservices@gmail.com</p>
                                </Col>
                                <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ fontSize: "14px" }}>Silang, Cavite 4118</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <p style={{ fontSize: "28px", fontWeight: 700, ...(dimension < 4) && { textAlign: "center" } }}>
                            Silang <span style={{ fontWeight: 300, display: dimension >= 4 ? "block" : "inline-block" }} >
                                Medical Services
                            </span>
                            <span style={{ fontWeight: 300, fontSize: "14px", maxWidth: dimension >= 3 ? "600px" : "none", display: "block" }} >
                                A technological leap from our standard medical processing in our barangay. to aid Barangay Officials and Health workers with health related record handling, monitoring and event handling.
                            </span>
                        </p>
                        </Col>
                        <Col span={24}>
                            <p style={{ fontSize: "14px", textAlign: "center", width: "100%" }}>
                                Copyright © {moment().format("YYYY")}. All rights reserved.
                            </p>
                        </Col>
                    </Row>
                </Row>
            </div>
        </div>
    );
};

export default TestPublic;
