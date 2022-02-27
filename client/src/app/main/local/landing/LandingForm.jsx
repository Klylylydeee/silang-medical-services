import React from 'react';

//Ant Design
import { Row, Col } from 'antd'
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';

//Images 
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'

//Styles
if(process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" && window.location.pathname === "/") {
    require( '../../local/landing/LandingStyles/LandingForm.scss');
}

function LandingForm() {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    return <Row>
        <Col xs={{ span: 15 }} sm={{ span: 24 }} md={{ span: 14 }} lg={{ span: 24 }}>
            <div className="LandingForm">

                {/* Left Side of the Form Section */}
                <div className="TitleSection">
                    <Col>
                        {/* Left Side */}
                        <div class="FormTitle">
                            <div className="LineDiv"></div>
                            <img src={BlackGrid} alt='Grid Design' className="black-gridForm" />
                            <h1>Medical Record <br /> Request</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Suspendisse et volutpat turpis, a sagittis nisl.
                                Phasellus posuere viverra nisl, et consectetur nisl ullamcorper id. </p>
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

                                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 12, span: 16 }}>
                                    {/* <Checkbox>Already requested? Check progress here!</Checkbox> */}
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
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