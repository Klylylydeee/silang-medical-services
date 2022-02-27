import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import toasterRequest from "src/app/util/toaster";

const User = () => {
    const params = useParams();
    const [ searchParams ] = useSearchParams();

    const { dimension } = useSelector((state) => state.web); 
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
       first_name: "", 
       last_name: "", 
       email: "", 
       phone_number: "", 
       designation: "",
       status: "",
       language: ""
    });

    const getUserData = async () => {
        try {

            dispatch(changeLoader({ loading: true }))
            let userCreate = await axiosAPI.post(`settings/user-data`, {
                id: params.id,
                barangay: searchParams.get("barangay")
            });
            setUserData({
                first_name: userCreate.data.payload.first_name, 
                last_name: userCreate.data.payload.last_name, 
                email: userCreate.data.payload.email, 
                phone_number: userCreate.data.payload.phone_number, 
                designation: userCreate.data.payload.designation,
                status: userCreate.data.payload.status,
                language: userCreate.data.payload.language
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
        getUserData()
    }, []);

    useEffect(() => {
        form.setFieldsValue(userData)
    }, [userData])

    return (
        // <div>{params.id}-{searchParams.get("barangay")}</div>
        
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="User Details" 
                    subTitle={dimension >= 4 ? "Primary Information of the user is listed below." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Form
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
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="last_name"
                                label="Last Name"
                            >
                                <Input disabled={true} />
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
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="phone_number"
                                label="Phone Number"
                            >
                                <Input addonBefore={(
                                    <Form.Item name="prefix" noStyle initialValue={"639"}>
                                        <Select >
                                            <Select.Option value="639">+639</Select.Option>
                                        </Select>
                                    </Form.Item>
                                )} disabled={true}/>
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
                        <Input disabled={true} />
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
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="status"
                                label="Status"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }} >
                            Return
                        </Button>
                    </Form.Item>
                </Form>
            </Layout.Content>
        </React.Fragment>
    );
};

export default User;
