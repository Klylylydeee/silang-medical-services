//Yarn Package
import React from 'react'
import { useState } from 'react';
import PinInput from "react-pin-input";

//Ant Design layout
import { Row, Col } from 'antd';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

//Page Assets
import CarouselItem1 from '../sign-in/sign-in-assets/dustin.png'
import CarouselItem2 from '../sign-in/sign-in-assets/DustinFries.png'
import CarouselItem3 from '../sign-in/sign-in-assets/DustinShawart.jpg'
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
        <Row>

            {/*Login Form Col*/}
            <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 17 }} lg={{ span: 7 }} >

                {/*Header Div, change href link to public landing page*/}
                <div className="header">
                    <a href='https://www.facebook.com/dustin.amoda'><img src={SHISLogo} alt='SHIS Logo' className="SHISLogo" /></a>
                    <div className="Box-Asset"></div>
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
                                    label="Username"
                                    name="username"
                                    className="form-group"
                                    rules={[{ required: true, message: 'Please input your username!' }]}>
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
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                {/*Submit Button for the form*/}
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-group">
                                    <Button type="primary" htmlType="submit" className="form-group" onClick={loginClick}>
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>


                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
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
            <Col push={1} xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 0 }} lg={{ span: 16 }} >
                <div className="carousel">
                    <Carousel autoplay style={{height: '965px', width: '1450px',}}>
                        <div>
                            <Image src={CarouselItem1} /> {/*Items that will be shown in the carousel*/}
                        </div>
                        <div>
                            <Image src={CarouselItem2} /> {/*Items that will be shown in the carousel*/}
                        </div>
                        <div>
                            <Image src={CarouselItem3} /> {/*Items that will be shown in the carousel*/}
                        </div>
                    </Carousel>
                </div>
            </Col>
        </Row>
    )
}

export default SignIn
