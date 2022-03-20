import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider, DatePicker, Alert, Switch} from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import moment from "moment";

const EventCreate = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { designation, barangay, first_name, last_name, email, phone_number } = useSelector((state) => state.user); 
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const history = useNavigate();
    const [ reqStatus, setReqStatus ] = useState(false);

    const onReset = () => {
        form.resetFields()
        form.setFieldsValue({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number.substring(3)
        })
    };

    const submitForm = async ({ prefix, email, last_name, first_name, phone_number, ...formData}) => {
        try {
            dispatch(changeLoader({ loading: true }))
            if(formData.end_datetime < formData.start_datetime){
                let error = new Error("End date and time is earler than the start date and time!");
                error.statusCode = 501;
                throw error;
            };
            let userCreate = await axiosAPI.post(`events/create-listing`, {
                ...formData,
                start_datetime: moment( formData.start_datetime, "YYYY-MM-DD HH:mm:ss"),
                end_datetime: moment( formData.end_datetime, "YYYY-MM-DD HH:mm:ss"),
                requestor: {
                    first_name,
                    last_name,
                    email,
                    phone_number: prefix + phone_number
                },
                barangay: barangay,
                createdBy: reqStatus === false ? `${first_name} ${last_name} (${designation})` : `${first_name} ${last_name}`,
                status: false
            });
            dispatch(changeLoader({ loading: false }));
            toasterRequest({ payloadType: "success", textString: userCreate.data.message});
            history({
                pathname: `/dashboard/event-listing/view/${userCreate.data.payload._id}`
            })
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    useEffect(() => {
        form.setFieldsValue({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number.substring(3)
        });
    // eslint-disable-next-line
    }, []);

    
    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Create Event Listing" 
                    subTitle={dimension >= 4 ? "Please fill-up everything before submitting." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Layout.Content style={{ marginBottom: "15px", borderRadius: "5px" }}>
                <Alert message="By default, the current user is set as the requestor. If the current user is not the requestor please select the switch." type="info" closeText="Close Now" />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Form
                    onFinish={submitForm}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Divider orientation="left" plain orientationMargin={10}>
                                Event Details
                            </Divider>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="event"
                                        label="Event"
                                        tooltip="Event's addressed or referred to."
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
                                        name="description"
                                        label="Description"
                                        tooltip="Written representation of the event"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Input.TextArea autoSize={{ minRows: 10, maxRows: 6 }}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Form.Item
                                        name="start_datetime"
                                        label="Start Date and Time"
                                        tooltip="Event's initial time start"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Form.Item
                                        name="end_datetime"
                                        label="End Date and Time"
                                        tooltip="Event's initial time end"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Divider orientation="left" plain orientationMargin={10}>
                                Requestor Details
                            </Divider>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 12 }}>
                                    <p style={{ fontSize: "14px", fontWeight: "400", paddingLeft: "10px" }}>Not the requestor?</p>
                                </Col>
                                <Col xs={{ span: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Switch defaultChecked onChange={() => { 
                                                if(reqStatus) {
                                                    form.setFieldsValue({
                                                        first_name: first_name,
                                                        last_name: last_name,
                                                        email: email,
                                                        phone_number: phone_number.substring(3)
                                                    })
                                                    setReqStatus(false)
                                                } else {
                                                    setReqStatus(true)
                                                    form.setFieldsValue({
                                                        first_name: "",
                                                        last_name: "",
                                                        email: "",
                                                        phone_number: ""
                                                    })
                                                }
                                            } } />
                                    </div>
                                </Col>
                            </Row>
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
                                        <Input disabled={!reqStatus}/>
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
                                        <Input disabled={!reqStatus}/>
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
                                        <Input disabled={!reqStatus}/>
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
                                        )} disabled={!reqStatus}/>
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

export default EventCreate;
