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
import barangayLogo2 from "src/app/main/local/img/barangay-putingkahoy.png";
import gridDot from "src/app/main/dashboard/sign-in/sign-in-assets/black-grid.png";
import silangMedicalServicesLogo from "src/app/main/dashboard/sign-in/sign-in-assets/SHIS-logo.png";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import jwt from "jsonwebtoken";
import { changeLoader } from "src/app/store/web/webInformation";
import { useSearchParams } from "react-router-dom";

function SignIn() {
    const dispatch = useDispatch();
    const { dimension } = useSelector((state) => state.web);
    const [ searchParams ] = useSearchParams();

    const [stepper, currentStep] = useState(1);
    const [pin, currentPIN] = useState("");
    const [signForm, setSignForm] = useState("");
    const [passVal, setPassVal] = useState({
        password: "",
        confirm_password: ""
    });
    const [passData, setPassData] = useState({});
    const [passwordBtn, setPasswordBtn] = useState(true);

    useEffect(() => {
        if(passVal.password.length < 5 || passVal.confirm_password.length < 5  ) {
            setPasswordBtn(true)
        } else {
            if(passVal.password === passVal.confirm_password){
                setPasswordBtn(false)
            } else {
                setPasswordBtn(true)
            }
        }
    }, [passVal]);

    const validatePassConfirmation = async () => {
        try {
            let decodedData = await jwt.verify(searchParams.get("payload"), process.env.REACT_APP_JWT_BACKEND);
            setPassData(decodedData.userData)
        } catch (err) {
            currentStep(1)
        }
    }

    const confirmPassChange = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let decodedData = await jwt.verify(searchParams.get("reset"), process.env.REACT_APP_JWT_BACKEND);
            const verifyPassword = await axiosAPI.post("authentication/accept-password", {
                email: decodedData.email,
                password: decodedData.password
            });
            toasterRequest({ payloadType: "success", textString: verifyPassword.data.message});
            currentStep(1)
            dispatch(changeLoader({ loading: false }))
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
        }
    }

    useEffect(() => {
        if(searchParams.get("payload") !== null){
            currentStep(5)
            validatePassConfirmation()
        } else if (searchParams.get("reset") !== null) {
            currentStep(1)
            confirmPassChange()
        } else {
            currentStep(1)
        }
    // eslint-disable-next-line
    }, [])

    const submitResetRequest = async () => {
        
        try {
            dispatch(changeLoader({ loading: true }))
            const verifyAndPassword = await axiosAPI.post(`settings/user-setting?id=${passData._id}`, {
                password: passVal.password
            });
            toasterRequest({ payloadType: "success", textString: verifyAndPassword.data.message});
            currentStep(1)
            dispatch(changeLoader({ loading: false }))
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        };
    } 

    const submitPassVerify =  async () => {
        
        try {
            dispatch(changeLoader({ loading: true }))
            const verifyAndPassword = await axiosAPI.post("authentication/sign-up-verification", {
                _id: passData._id,
                password: passVal.password
            });
            toasterRequest({ payloadType: "success", textString: verifyAndPassword.data.message});
            currentStep(1)
            dispatch(changeLoader({ loading: false }))
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        };
    } 

    const submitNewPassword = async (formData) => {
        try {
            dispatch(changeLoader({ loading: true }))
            const getConfirmation = await axiosAPI.post("authentication/lost-password", {
                email: formData.email,
                password: formData.password,
            });
            toasterRequest({ payloadType: "success", textString: getConfirmation.data.message});
            currentStep(1)
            dispatch(changeLoader({ loading: false }))
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        };
    };

    const submitSignForm = async (formData) => {
        try {
            dispatch(changeLoader({ loading: true }))
            const getAuthentication = await axiosAPI.post("authentication/sign-in", {
                email: formData.email,
                password: formData.password,
            });
            toasterRequest({ payloadType: "success", textString: getAuthentication.data.message});
            currentStep(2)
            setSignForm(formData.email)
            dispatch(changeLoader({ loading: false }))
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        };
    };

    const submitPINForm = async (pinPayload) => {
        try {
            dispatch(changeLoader({ loading: true }))
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
            dispatch(changeLoader({ loading: false }))
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
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
            dispatch(changeLoader({ loading: true }))
            const getThresholdReset = await axiosAPI.post("authentication/account-reset", {
                email: formData.email
            });
            toasterRequest({ payloadType: "success", textString: getThresholdReset.data.message});
            currentStep(1)
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
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
                            onClick={
                                () => {
                                    window.open("https://silangmedical.com/", "_blank")
                                }
                            }
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
                                <p style={{ fontSize: "11px",  fontWeight: 600, color: "gray"}}>Forgot your password? Let us help you <span style={{ color: "#001529", cursor: "default" }} onClick={()=> { currentStep(3) }}>reset it</span>.</p>
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
                                onFinish={submitNewPassword}
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
                                    label="New Password"
                                    name="password"
                                    tooltip="Please ensure that no one is behind you."
                                    rules={[{ required: true, message: 'Please input your password!' }, { min: 5, message: "Password length must be 5 characters long or longer"}]}
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
                    {
                        stepper === 5 &&
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h1 style={{ fontSize: "50px", color: "black", lineHeight: "5px"}}>
                                    Set Password
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
                                layout={ dimension >= 3 ? "horizontal" : "vertical" }
                                style={{
                                    padding: dimension >= 2 ? "20px 60px 0 60px" : "0px 30px"
                                }}
                                onFinish={searchParams.get("reset") === null ? submitPassVerify : submitResetRequest}
                                onValuesChange={({password, confirm_password, ...rest})=> {
                                    if(password !== undefined){
                                        setPassVal({
                                            ...passVal,
                                            password
                                        })
                                    } else if(confirm_password !== undefined){
                                        setPassVal({
                                            ...passVal,
                                            confirm_password
                                        })
                                    }
                                }}
                            >
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    tooltip="Typically used hosting address is @gmail.com"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please fill out this field!',
                                        }
                                    ]}
                                    required={true}
                                >
                                        <Input.Password
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                        />
                                </Form.Item>
                                <Form.Item
                                    name="confirm_password"
                                    label="Confrim Password"
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
                                    <Button type="primary" htmlType="submit" block={true} disabled={passwordBtn} style={{ marginTop: "10px" }}>
                                        Set password
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
                            src={barangayLogo2}
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