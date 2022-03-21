import React from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { Helmet } from "react-helmet-async";

const UserCreate = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { designation, barangay } = useSelector((state) => state.user); 
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const history = useNavigate();

    const onReset = () => {
      form.resetFields();
    };

    const submitForm = async ({ prefix, ...formData }) => {
        try {
            dispatch(changeLoader({ loading: true }))
            const submitData = {
                ...formData,
                password: "encrypted",
                barangay: barangay,
                phone_number: prefix + formData.phone_number
            }
            let userCreate = await axiosAPI.post(`settings/user-invitation`, submitData);
            dispatch(changeLoader({ loading: false }));
            toasterRequest({ payloadType: "success", textString: userCreate.data.message});
            history({
                pathname: `/dashboard/users/view/${userCreate.data.payload.id}`
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
                <title>User | Portal Silang Medical Services</title>
            </Helmet>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Create New User" 
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
                    <Divider orientation="left" plain orientationMargin={10}>
                        Personal Details
                    </Divider>
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                    <Divider orientation="left" plain orientationMargin={10}>
                        Digital Details
                    </Divider>
                    <Row gutter={[24, 0]}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                                required={true}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                    <Divider orientation="left" plain orientationMargin={10}>
                        Barangay Details
                    </Divider>
                    <Form.Item
                        name="designation"
                        label="Designation"
                        tooltip="Individual's position in the barangay"
                        rules={[
                            {
                                required: true,
                                message: "Please fill out this field!",
                            },
                        ]}
                        required={true}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            {
                                [
                                    ...designation === "Chairman" ? ["Chairman"] : [],
                                    "Staff",
                                    "Doctor",
                                    "Nurse",
                                ].map((currentDesignation, optionIndex) => {
                                    return (
                                        <Select.Option key={optionIndex} value={currentDesignation}>{currentDesignation}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
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

export default UserCreate;
