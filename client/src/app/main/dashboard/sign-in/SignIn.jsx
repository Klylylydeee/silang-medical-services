import React, { useState, useEffect } from "react"
import PinInput from "react-pin-input";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "src/app/store/user/userInformation";
import { authorizeUser } from "src/app/store/web/webInformation";
import { Row, Col, Carousel, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./signInStyles.scss";
import arkImage from "src/app/main/dashboard/sign-in/sign-in-assets/lumil1.png";
import hallImage from "src/app/main/dashboard/sign-in/sign-in-assets/lumil2.png";
import hall_2Image from "src/app/main/dashboard/sign-in/sign-in-assets/lumil3.png";
import barangayLogo from "src/app/main/dashboard/sign-in/sign-in-assets/barangay-lumil.png";
import gridDot from "src/app/main/dashboard/sign-in/sign-in-assets/black-grid.png";
import silangMedicalServicesLogo from "src/app/main/dashboard/sign-in/sign-in-assets/SHIS-logo.png";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import jwt from "jsonwebtoken";

function SignIn() {
    const dispatch = useDispatch();
    const { dimension } = useSelector((state) => state.web);

    const [stepper, currentStep] = useState(1);
    const [pin, currentPIN] = useState("");
    const [signForm, setSignForm] = useState("");

    const submitSignForm = async (formData) => {
        try {
            const getAuthentication = await axiosAPI.post("authentication/sign-in", {
                email: formData.email,
                password: formData.password,
            });
            toasterRequest({ payloadType: "success", textString: getAuthentication.data.message});
            currentStep(2)
            setSignForm(formData.email)
        } catch(err) {
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        };
    };

    const submitPINForm = async (pinPayload) => {
        try {
            const getPINAuthentication = await axiosAPI.post("authentication/pin-verification", {
                email: signForm,
                pin: pinPayload,
            });
            toasterRequest({ payloadType: "success", textString: getPINAuthentication.data.message});
            const decodedData = jwt.verify(getPINAuthentication.data.payload, process.env.REACT_APP_JWT_BACKEND);
            localStorage.setItem("Authorization", getPINAuthentication.data.payload);
            dispatch(
                signIn({
                    first_name : decodedData.first_name,
                    last_name : decodedData.last_name,
                    email : decodedData.email,
                    phone_number : decodedData.phone_number,
                    barangay : decodedData.barangay,
                    designation : decodedData.designation
                })
            );
            dispatch(authorizeUser({
                language : decodedData.language
            }));
        } catch(err) {
            if(err.response) {
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
                if(err.response.data.message === "Max pin threshold has been meet. Please reset your account's password.") {
                    currentStep(3)
                }
            } else {
                toasterRequest({ payloadType: "error", textString: err.message});
            }
        };
    };

    const submitThresholdReset = async (formData) => {
        try {
            const getThresholdReset = await axiosAPI.post("authentication/account-reset", {
                email: formData.email
            });
            toasterRequest({ payloadType: "success", textString: getThresholdReset.data.message});
            currentStep(1)
        } catch(err) {
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        };
    }

    useEffect(() => {
        if(stepper !== 2) {
            currentPIN("")
        }
    }, [stepper]);

    return (
        <Row style={{ minHeight: "100vh", overflow: "hidden" }}>
            <Col
                xs={{ span: 24 }} 
                sm={{ span: 24 }} 
                md={{ span: 24 }}
                lg={{ span: 24 }} 
                xl={{ span: 10 }} 
                style={{ 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px"
                }}
            >
                <div style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    maxWidth: "1000px",
                    maxHeight: "1000px",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <img 
                        src={gridDot}
                        style={{ 
                            position: "absolute",
                            top: dimension <= 4 ? "7.5%" : "15%",
                            right: dimension <= 4 ? "-4%" : "-6%",
                            height: dimension <= 5 ? "75px" : "100px",
                            width: dimension <= 5 ? "75px" : "100px",
                            zIndex: 2
                        }} 
                        alt=""
                    />
                    <img 
                        src={gridDot}
                        style={{ 
                            position: "absolute",
                            bottom: dimension <= 4 ? "7.5%" : "15%",
                            left: dimension <= 4 ? "-4%" : "-3%",
                            height: dimension <= 5 ? "75px" : "100px",
                            width: dimension <= 5 ? "75px" : "100px",
                            zIndex: 2
                        }} 
                        alt=""
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <img 
                            src={silangMedicalServicesLogo}
                            alt=""
                            style={{
                                height: dimension >= 5 ? "100px" : "70px",
                                width: dimension >= 5 ? "130px" : "100px",
                                marginRight: "10%"
                            }}
                        />
                        <div 
                            style={{ 
                                backgroundColor: "#AD72B7",
                                marginBottom: dimension >= 6 ? "5%" : "8%",
                                flex: 1,
                                borderRadius: "0 0 0 15px"
                            }}
                        />
                    </div>
                    {
                        stepper === 1 && 
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h1 style={{ fontSize: "50px", color: "black", lineHeight: "5px"}}>
                                    Welcome
                                </h1>
                                <p style={{ 
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#AD72B7",
                                    padding: dimension >= 2 ? "10px 60px 0 60px" : "0px 30px",
                                    textAlign: "center"
                                }}>
                                    By accessing the Silang Medical Services Portal, you will have access to all participating data and accepting the Rules and Conditions.
                                </p>
                            </div>
                            <Form
                                onFinish={submitSignForm}
                                layout={ dimension >= 3 ? "horizontal" : "vertical" }
                                style={{
                                    padding: dimension >= 2 ? "20px 60px 0 60px" : "0px 30px"
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    tooltip="Typically used hosting address is @gmail.com"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Input is not a valid Email!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please fill out this field!',
                                        }
                                    ]}
                                    required={true}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />} 
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    tooltip="Please ensure that no one is behind you."
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" block={true} style={{ marginTop: "10px" }}>
                                    Sign-in
                                </Button>
                            </Form>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "20px" }}>
                                <p style={{ fontSize: "11px",  fontWeight: 600, color: "gray"}}>Request for threshold reset? Create a <span style={{ color: "#001529", cursor: "default" }} onClick={()=> { currentStep(4) }}>ticket request here</span>.</p>
                                {/* <p style={{ fontSize: "11px",  fontWeight: 600, color: "gray"}}>Forgot your password? Let us help you <span style={{ color: "#001529", cursor: "default" }} onClick={()=> { currentStep(3) }}>reset it</span>.</p> */}
                            </div>
                        </div>
                    }
                    {
                        stepper === 2 &&
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h1 style={{ fontSize: "50px", color: "black", lineHeight: "5px"}}>
                                    PIN Verification
                                </h1>
                                <p style={{ 
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#AD72B7",
                                    padding: dimension >= 2 ? "10px 60px 0 60px" : "0px 30px",
                                    textAlign: "center"
                                }}>
                                    By accessing the Silang Medical Services Portal, you will have access to all participating data and accepting the Rules and Conditions.
                                </p>
                            </div>
                            <div style={{ 
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: dimension >= 2 ? "10px 60px 0 60px" : "0px 30px",
                            }}>
                                <PinInput
                                    length={6}
                                    focus={true}
                                    initialValue={pin}
                                    onChange={(pin) => { currentPIN(pin) }}
                                    type="numeric"
                                    inputMode="number"
                                    inputStyle={{ borderColor: 'black' }}
                                    inputFocusStyle={{ borderColor: '#AD72B7' }}
                                    autoSelect={true}
                                    regexCriteria={/^[0-9]*$/}
                                />
                                <Row align="middle" justify="center" gutter={[50, 50]} style={{ width: "100%", marginTop: "20px"}}>
                                    <Col>
                                        <Button type="primary" htmlType="submit" block={true} onClick={() => { currentStep(1) }}>
                                            Return to sign-in
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary" htmlType="submit" block={true} disabled={pin.length !== 6 ? true : false } onClick={() => { submitPINForm(pin) }}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    }
                    {
                        stepper === 3 &&
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h1 style={{ fontSize: "50px", color: "black", lineHeight: "5px"}}>
                                    Reset Password
                                </h1>
                                <p style={{ 
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#AD72B7",
                                    padding: dimension >= 2 ? "10px 60px 0 60px" : "0px 30px",
                                    textAlign: "center"
                                }}>
                                    By accessing the Silang Medical Services Portal, you will have access to all participating data and accepting the Rules and Conditions.
                                </p>
                            </div>
                            <Form
                                onFinish={submitSignForm}
                                layout={ dimension >= 3 ? "horizontal" : "vertical" }
                                style={{
                                    padding: dimension >= 2 ? "20px 60px 0 60px" : "0px 30px"
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    tooltip="Typically used hosting address is @gmail.com"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Input is not a valid Email!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please fill out this field!',
                                        }
                                    ]}
                                    required={true}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />} 
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    tooltip="Please ensure that no one is behind you."
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                    />
                                </Form.Item>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    <Button type="default" onClick={() => { currentStep(1) }} block={true} style={{ marginTop: "10px", width: "40%", marginRight: "30px" }}>
                                        Return
                                    </Button>
                                    <Button type="primary" htmlType="submit" block={true} style={{ marginTop: "10px" }}>
                                        Request change password
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    }
                    {
                        stepper === 4 &&
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h1 style={{ fontSize: "50px", color: "black", lineHeight: "5px"}}>
                                    PIN Reset
                                </h1>
                                <p style={{ 
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#AD72B7",
                                    padding: dimension >= 2 ? "10px 60px 0 60px" : "0px 30px",
                                    textAlign: "center"
                                }}>
                                    By accessing the Silang Medical Services Portal, you will have access to all participating data and accepting the Rules and Conditions.
                                </p>
                            </div>
                            <Form
                                onFinish={submitThresholdReset}
                                layout={ dimension >= 3 ? "horizontal" : "vertical" }
                                style={{
                                    padding: dimension >= 2 ? "20px 60px 0 60px" : "0px 30px"
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    tooltip="Typically used hosting address is @gmail.com"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Input is not a valid Email!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please fill out this field!',
                                        }
                                    ]}
                                    required={true}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />} 
                                    />
                                </Form.Item>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    <Button type="default" onClick={() => { currentStep(1) }} block={true} style={{ marginTop: "10px", width: "40%", marginRight: "30px" }}>
                                        Return
                                    </Button>
                                    <Button type="primary" htmlType="submit" block={true} style={{ marginTop: "10px" }}>
                                        Request threshold reset
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    }
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: "20px"
                        }}
                    >
                        <img 
                            src={barangayLogo}
                            style={{
                                height: "85px",
                                width: "85px",
                                marginRight: "20px"
                            }}
                            alt=""
                        />
                        <img 
                            src={barangayLogo}
                            style={{
                                height: "85px",
                                width: "85px"
                            }}
                            alt=""
                        />
                    </div>
                </div>
            </Col>
            <Col 
                xs={{ span: 0 }}
                sm={{ span: 0 }}
                md={{ span: 0 }}
                lg={{ span: 0 }}
                xl={{ span: 14 }}
            >
                <Carousel effect="fade">
                    {
                        [
                            { src: arkImage },
                            { src: hallImage },
                            { src: hall_2Image },
                        ].map((currentBackground, bgIndex) => {
                            return (
                                <div key={bgIndex} style={{ backgroundColor: "red" }}>
                                    <div style={{
                                        backgroundImage: `url("${currentBackground.src}")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPositionY: "50%",
                                        backgroundPositionX: dimension <= 4 ? "50%" : "none",
                                        filter: "blur(1px)"
                                    }}>
                                        <div
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                background: "linear-gradient(360deg, rgba(255,255,255,0.3), rgba(255,255,255,0.3), rgba(255,255,255,0))"
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </Col>
        </Row>
    )
}

export default SignIn