import React from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider, DatePicker } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { Helmet } from "react-helmet-async";
import moment from "moment";

const EventAttendee = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { barangay } = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const params = useParams();

    const [form] = Form.useForm();

    const history = useNavigate();

    const onReset = () => {
        form.resetFields()
    };

    const submitForm = async ({ prefix, email, last_name, first_name, phone_number, ...formData }) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let userCreate = await axiosAPI.post(`events/update-listing-attendee?id=${params.id}&barangay=${barangay}`, {
                first_name,
                last_name,
                email,
                phone_number: prefix + phone_number,
                isApproved: true,
                ...formData
            });
            dispatch(changeLoader({ loading: false }));
            toasterRequest({ payloadType: "success", textString: userCreate.data.message});
            history({
                pathname: `/dashboard/event-listing/view/${params.id}`
            })
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }
    
    return (
        <React.Fragment>
            <Helmet>
                <title>Event | Portal Silang Medical Services</title>
            </Helmet>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Add Event Attendee" 
                    subTitle={dimension >= 4 ? "Please fill-up everything before submitting." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Form
                    onFinish={submitForm}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} >
                            <Divider orientation="left" plain orientationMargin={10}>
                                Personal Details
                            </Divider>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="first_name"
                                        label="First Name"
                                        tooltip="Individual's given birth first name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="last_name"
                                        label="Last Name"
                                        tooltip="Individual's given last name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 12 }} >
                                    <Form.Item
                                        name="gender"
                                        label="Gender"
                                        tooltip="Basis of user's sexual identity"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Select>
                                            <Select.Option value="Male">Male</Select.Option>
                                            <Select.Option value="Female">Female</Select.Option>
                                            <Select.Option value="Others">Others</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Form.Item
                                        name="date_of_birth"
                                        label="Date of Birth"
                                        tooltip="Citizen's birth date"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <DatePicker disabledDate={(current) => current && current > moment().endOf('day')} format="YYYY-MM-DD" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        tooltip="Individual's personal/private email address"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Input is not a valid Email!',
                                            },
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
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
                                        <Input addonBefore={(
                                            <Form.Item name="prefix" noStyle initialValue={"639"}>
                                                <Select >
                                                    <Select.Option value="639">+639</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        )} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => onReset() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Layout.Content>
        </React.Fragment>
    );
};

export default EventAttendee;
