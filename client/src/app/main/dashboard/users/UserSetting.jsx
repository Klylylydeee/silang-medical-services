import React, { useEffect, useState } from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider, Modal} from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import toasterRequest from "src/app/util/toaster";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const UserSetting = () => {
    const history = useNavigate();
    const { dimension } = useSelector((state) => state.web); 
    const { email } = useSelector((state) => state.user); 
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
       first_name: "", 
       last_name: "", 
       email: "", 
       phone_number: "", 
       designation: "",
       status: "",
       language: "",
       _id: ""
    });

    const getUserData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let userCreate = await axiosAPI.post(`settings/user-data`, {
                email: email
            });
            setUserData({
                first_name: userCreate.data.payload.first_name, 
                last_name: userCreate.data.payload.last_name, 
                email: userCreate.data.payload.email, 
                phone_number: userCreate.data.payload.phone_number, 
                designation: userCreate.data.payload.designation,
                status: userCreate.data.payload.status,
                language: userCreate.data.payload.language,
                createdAt: moment(userCreate.data.payload.createdAt).format("MMMM DD,YYYY h:MM:ss a"),
                updatedAt: moment(userCreate.data.payload.updatedAt).format("MMMM DD,YYYY h:MM:ss a"),
                _id: userCreate.data.payload._id
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
    const [form] = Form.useForm();

    useEffect(() => {
    // eslint-disable-next-line
        getUserData();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        form.setFieldsValue(userData)
    // eslint-disable-next-line
    }, [userData])

    const submitChanges = async (formData) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let userCreate = await axiosAPI.post(`settings/user-setting?id=${userData._id}`, {
                email: formData.email,
                phone_number: formData.prefix + formData.phone_number,
                password: formData.password
            });
            toasterRequest({ payloadType: "success", textString: userCreate.data.message })
            getUserData()
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const confirmForm = (data) => {
        confirm({
            title: 'Please confirm the changes.',
            icon: <ExclamationCircleOutlined />,
            content: 'Note: This user have his/her primary information updated based on the changes made in the form',
            onOk() {
                submitChanges(data)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Personal Settings" 
                    subTitle={dimension >= 4 ? "Your Primary Information." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={confirmForm}
                >
                    <Divider orientation="left" plain orientationMargin={10}>
                        Personal Details
                    </Divider>
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="first_name"
                                label="First Name"
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="last_name"
                                label="Last Name"
                            >
                                <Input disabled={true}/>
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
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill out this field!",
                                    },
                                ]}
                            >
                                <Input  />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="phone_number"
                                label="Phone Number"
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
                    >
                        <Input  disabled={true}/>
                    </Form.Item>
                    <Divider orientation="left" plain orientationMargin={10}>
                        Application Settings
                    </Divider>
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="language"
                                label="Language"
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="status"
                                label="Status"
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[24, 0]}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="createdAt"
                                label="Account Creation"
                            >
                                <Input  disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="updatedAt"
                                label="Last Accessed"
                            >
                                <Input  disabled={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Divider orientation="left" plain orientationMargin={10}>
                        Confirm Changes
                    </Divider>
                    <Row gutter={[24, 0]}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="password"
                                label="Current Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill out this field!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }} onClick={()=> {
                            history({
                                pathname: `/dashboard`
                            })
                        }}>
                            Return
                        </Button>
                        <Button type="primary" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  htmlType="submit">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </Layout.Content>
        </React.Fragment>
    );
};

export default UserSetting;
