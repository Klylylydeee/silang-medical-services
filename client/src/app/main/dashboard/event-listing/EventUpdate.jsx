import React, { useEffect } from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider, DatePicker } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const EventUpdate = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { barangay, first_name, last_name, designation } = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const params = useParams();

    const [form] = Form.useForm();

    const history = useNavigate();

    const onReset = () => {
        form.resetFields()
    };

    const submitForm = async ({ prefix, email, phone_number, ...formData}) => {
        try {
            dispatch(changeLoader({ loading: true }))
            if(formData.end_datetime < formData.start_datetime){
                let error = new Error("End date and time is earler than the start date and time!");
                error.statusCode = 501;
                throw error;
            };
            let userCreate = await axiosAPI.post(`events/update-listing?id=${params.id}&barangay=${barangay}`, {
                ...formData,
                start_datetime: moment( formData.start_datetime, "YYYY-MM-DD HH:mm:ss"),
                end_datetime: moment( formData.end_datetime, "YYYY-MM-DD HH:mm:ss"),
                requestor: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email,
                    phone_number: prefix + phone_number
                },
                barangay: barangay,
                status: formData.status,
                ...(formData.status === true) && { approvedBy: `${first_name} ${last_name} (${designation})`}
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

    const getData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventListingData = await axiosAPI.get(`events/event?id=${params.id}&barangay=${barangay}`);
            form.setFieldsValue({
                event: eventListingData.data.payload.event,
                description: eventListingData.data.payload.description,
                first_name: eventListingData.data.payload.requestor.first_name,
                last_name: eventListingData.data.payload.requestor.last_name,
                phone_number: eventListingData.data.payload.requestor.phone_number.substring(3),
                email: eventListingData.data.payload.requestor.email,
                start_datetime: moment(eventListingData.data.payload.start_datetime, "YYYY-MM-DD HH:mm:ss"),
                end_datetime: moment(eventListingData.data.payload.end_datetime, "YYYY-MM-DD HH:mm:ss"),
                status: eventListingData.data.payload.status
            })
            dispatch(changeLoader({ loading: false }))
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line
    }, []);
    
    return (
        <React.Fragment>
            <Helmet>
                <title>Event | Portal Silang Medical Services</title>
            </Helmet>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Update Event Listing" 
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
                        <Col xs={{ span: 24 }}>
                            <Divider orientation="left" plain orientationMargin={10}>
                                Event Status
                            </Divider>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="status"
                                        label="Status"
                                        tooltip="Basis whether the event is approved or not"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Select >
                                            <Select.Option value={true}>Active</Select.Option>
                                            <Select.Option value={false}>Inactive</Select.Option>
                                        </Select>
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

export default EventUpdate;
