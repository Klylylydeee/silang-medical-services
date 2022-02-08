//Yarn Package
import React from 'react'
import { useState } from 'react';
import PinInput from "react-pin-input";

//Ant Design layout
import { Row, Col } from 'antd';
import { Carousel } from 'antd';
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

//Page Assets
import Rectangle from '../sign-in/sign-in-assets/Rectangle.png'
import SHISLogo from '../sign-in/sign-in-assets/SHIS-logo.png'
import BrgyLogo from '../sign-in/sign-in-assets/barangay-lumil.png'
import BlackGrid from '../sign-in/sign-in-assets/black-grid.png'

//Scss Styling
import '../../../../styles/SignIn.scss'

function SignIn() {

    //useState for the Login Form, Pin Input and Reset Account
    const [step, setStep] = useState(1);
    const loginClick = () => {
        setStep(2) //set state into Pin Input form
    }

    const backClick = () => {
        setStep(1) //Temporary back button
    }

    const resetClick = () => {
        setStep(3) //set state into Reset Account form
    }

    return (
        <Row style={{minHeight: "100vh"}}>

            {/*Login Form Col*/}
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 11 }} xl={{ span: 8}} xxl={{ span: 8}} className="left-container">

                {/*Header Div, change href link to public landing page*/}
                <div className="header">
                    <a href='https://www.facebook.com/dustin.amoda'><img src={SHISLogo} alt='SHIS Logo' className="SHISLogo" /></a>
                    <div className="Box-Asset">
                        <img src={Rectangle} alt="this is a box"></img>
                    </div>
                </div>

                <img src={BlackGrid} alt='Grid Design' className="black-grid" />

                <div className="desc-text">
                    <h1>Welcome</h1>
                    <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed feugiat tincidunt urna, ut sodales enim.</h3>
                </div>

                {/*Sign-In Form, all validations will be in here*/}
                {
                    step === 1 ?
                        <div className="form-body">
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                className="signInForm">

                                {/*Username Form Item*/}
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="form-group"
                                    rules={[{ required: true, message: 'Please input your email!' }]}>
                                    <Input />
                                </Form.Item>

                                {/*Password Form Item*/}
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    className="form-group"
                                    rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password />
                                </Form.Item>

                                {/*Remember-Me Checkbox Form Item, can be removed if not needed*/}
                                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} className="form-group">
                                    <Checkbox className="rememberMe">Remember me</Checkbox>
                                </Form.Item>

                                {/*Submit Button for the form*/}
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-group">
                                    <Button type="primary" htmlType="submit" className="loginButton" onClick={loginClick}>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                        //Step 2 will take over
                        // at this step the user must put Pin code
                        //sent to their contact number or email
                        : step === 2 ?
                            <Row>
                                <Col>
                                    <div className="pinCode">
                                        <h4>Enter the Pin Code below.</h4>
                                        {/*Pin code input*/}
                                        <Input.Group size="large" className="formPin">
                                            <PinInput
                                                length={6}
                                                initialValue=""
                                                type="numeric"
                                                inputMode="number"
                                                style={{ padding: '10px' }}
                                                inputStyle={{ borderColor: 'black' }}
                                                inputFocusStyle={{ borderColor: '#AD72B7' }}
                                                autoSelect={true}
                                                regexCriteria={/^[0-9]*$/} />
                                            {/*Reset Account Button for the form*/}
                                            <Button type="text" onClick={resetClick}>
                                                <p>Reset Account</p>
                                            </Button>
                                            {/*Submit Button for the form*/}
                                            <Button type="primary" htmlType="submit" className="pin-form-submit" onClick={backClick}>
                                                Submit
                                            </Button>
                                        </Input.Group>
                                    </div>
                                </Col>
                            </Row>

                            //If the user already maxed the Pin Input
                            //The user can reset their account thru here
                            //User must input email thru here
                            :

                            <div className="resetAccount">
                                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                                {/*Email form to be submitted*/}
                                <Input
                                    placeholder="Enter your email address"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    suffix={
                                        <Tooltip title="Please input your email">
                                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                />
                                {/*Submit Button for the form*/}
                                <Button type="primary" htmlType="submit" className="pin-form-submit" onClick={backClick}>
                                    Submit
                                </Button>
                                {/*Back Button for the form*/}
                                <Button type="text" onClick={loginClick}>
                                    <p>Back</p>
                                </Button>
                            </div>
                }

                <img src={BlackGrid} alt='Grid Design' className="black-grid-2" />

                {/*Barangay Logos will be found here*/}
                <div className="logos">
                    <img src={BrgyLogo} alt='Barangay Logo' className="PKLogo" />
                    <img src={BrgyLogo} alt='Barangay Logo' className="LumilLogo" />
                </div>
            </Col>


            {/*Carousel Col*/}
            <Col push={2} xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 0 }} lg={{ span: 11 }} xl={{ span: 14}} xxl={{ span: 14}} className="right-container">
                <div className="carousel">
                    <Carousel autoplay>

                        <div className="contentStyle1">
                        </div>

                        <div className="contentStyle2">
                        </div>

                        <div className="contentStyle3">
                        </div>

                    </Carousel>
                </div>
            </Col>
        </Row>
    )
}

export default SignIn