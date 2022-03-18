import React from 'react';
import { useNavigate } from "react-router-dom"
import jwt from "jsonwebtoken";

//Ant Design
import { Row, Col } from 'antd'
import { Form, Input, Button, Select } from 'antd';

//Images 
import BlackGrid from '../landing/LandingPage-assets/black-grid.png'
import { useSelector } from "react-redux";
//Styles
if (process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build") {
    require('../../local/landing/LandingStyles/LandingForm.scss');
}

function LandingForm() {
    const history = useNavigate();
    const { dimension } = useSelector((state) => state.web);

    const createAuth = (email, barangay) => {
        const token = jwt.sign({
            email: email,
            barangay: barangay
        }, process.env.REACT_APP_JWT_BACKEND, {
            expiresIn: "1h",
            algorithm: "HS512"
        });
        return token
    }

    const onFinish = (values) => {
        const authToken = createAuth(values.email, values.barangay)
        history({
            pathname: `/medical-record?auth=${authToken}`
        })
    };

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
                                autoComplete="off"
                                className="FormLabel"
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="EmailForm"
                                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: "Incorrect email format!" }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Barangay"
                                    name="barangay"
                                    rules={[{ required: true, message: 'Please input your barangay!' }]}
                                >
                                    <Select>
                                        <Select.Option value="Lumil">Lumil</Select.Option>
                                        <Select.Option value="Puting Kahoy">Puting Kahoy</Select.Option>
                                    </Select>
                                </Form.Item>

                                {
                                    dimension >= 4 ?
                                        <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
                                            <Button type="primary" htmlType="submit" className="SubmitBtn" size={"large"}>
                                                Search
                                            </Button>
                                        </Form.Item>

                                        :

                                        <Form.Item wrapperCol={{ span: 4 }} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                                            <Button type="primary" htmlType="submit" className="SubmitBtn" size={"large"}>
                                                Search
                                            </Button>
                                        </Form.Item>
                                }

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
