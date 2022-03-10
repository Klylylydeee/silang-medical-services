import React from 'react';

//Ant Design
import { Row, Col } from 'antd'
import { Form, Input, Button } from 'antd';

//Images 
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'

//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require('../../local/landing/LandingStyles/LandingForm.scss');
}

function LandingForm() {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    return <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
            <div className="LandingForm">

                {/* Left Side of the Form Section */}
                <div className="TitleSection">
                    <Col>
                        {/* Left Side */}
                        <div class="FormTitle">
                            <div className="LineDiv"></div>
                            <img src={BlackGrid} alt='Grid Design' className="black-gridForm" />
                            <h1>Medical Record <br /> Request</h1>
                            <p> If you have any concerns or problems that you would like to be addressed, 
                                feel free to contact us and leave an email.
                                We would be more than happy to respond to you. Thank you and have a nice day! </p>
                        </div>
                    </Col>
                </div>

                {/* right side: Medical Record Request Form */}
                <div className="FormSection">
                    <Col>
                        <div className="RightSection">
                            <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                className="FormLabel"
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="EmailForm"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Barangay"
                                    name="barangay"
                                    rules={[{ required: true, message: 'Please input your barangay!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <div className="CheckLink">
                                    <a href="https://www.w3schools.com/">Already requested? Check progress here!</a>
                                </div>

                                <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
                                    <Button type="primary" htmlType="submit" className="SubmitBtn" size={"large"}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                            {/* Right Grid Image */}
                            <img src={BlackGrid} alt='Grid Design' className="black-gridForm2" />
                        </div>
                    </Col>
                </div>

            </div>
        </Col>
    </Row>
}

export default LandingForm;
