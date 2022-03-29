import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import moment from "moment";
import { changeLoader } from "src/app/store/web/webInformation";
import { PageHeader, Layout, Row, Col, Menu, Empty, Pagination, Card, Button, Descriptions, Space, Tooltip, Drawer, Form, Input, Divider, Switch, DatePicker, Alert, Modal, Tag } from "antd";
import { AuditOutlined, CloseCircleOutlined, InfoCircleOutlined, UserOutlined, MailOutlined, ExclamationCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Table } from "ant-table-extensions";
import { Helmet } from "react-helmet-async";
import "./communication.scss";

const { confirm } = Modal;

const Communication = () => {
    const { dimension } = useSelector((state) => state.web);
    const { barangay, first_name, last_name, email, phone_number} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [paginationNum, setPaginationNum] = useState(1);
    const [createDrawer, setCreateDrawer] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [createModalData, setCreateModalData] = useState({});

    const [updateDrawer, setUpdateDrawer] = useState(false);
    const [updateDrawerData, setUpdateDrawerData] = useState({});
    const [updateForm] = Form.useForm();
    const [subscriptionDrawer, setSubscriptionDrawer] = useState(false);
    const [sendAnnouncement, setSendAnnouncement] = useState(false);
    const [createForm] = Form.useForm();
    // eslint-disable-next-line
    const [commData, setCommData] = useState([
    ]);
    const [selectedComm, setSelectedComm] = useState({});
    // eslint-disable-next-line
    const [ data, setData ] = useState([]);
    const [ subData, setSubData ] = useState([]);
    const titleRef = useRef();

    const [selectedVerificationDetails, setSelectedVerificationDetails] = useState(false);
    const [selectedVerificationDetailsData, setSelectedVerificationDetailsData] = useState({});
                
    const columns = [
        {
            title: 'Full Name',
            key: 'full name',
            width: "30%",
            render: (text, row) => (
                <Space size="middle">
                    <p>{text.first_name} {text.last_name}</p>
                </Space>
            ),
        },
        {
            title: 'Contact Details',
            key: 'contact details',
            width: "30%",
            render: (text, row) => (
                <Space size="middle">
                    <p>{text.email}/{text.phone_number}</p>
                </Space>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "Status",
            width: "20%",
            sorter: (a, b) => a.phone_number.length - b.phone_number.length
        }
    ];
    const subscriptionColumns = [
        {
            title: 'Full Name',
            key: 'full name',
            render: (text, row) => (
                <Space size="middle">
                    <p>{text.first_name} {text.last_name}</p>
                </Space>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "Email",
            sorter: (a, b) => a.email.length - b.email.length
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "Phone Number",
            sorter: (a, b) => a.phone_number.length - b.phone_number.length
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "Address",
            sorter: (a, b) => a.address.length - b.address.length
        },
        {
            title: 'Verification',
            key: 'action',
            render: (text, row) => (
                <Space size="middle">
                    {
                        text.status === false ?
                            <Tooltip title="Show Verification Details">
                                <Button
                                    type="primary"
                                    onClick={()=> { 
                                        setSelectedVerificationDetails(!selectedVerificationDetails)
                                        setSelectedVerificationDetailsData({
                                            title: text.first_name + " " +text.last_name,
                                            ...(text.vaccine_card) && { vaccine_card: text.vaccine_card },
                                            ...(text.any_id) && { any_id: text.any_id },
                                            ...(text.proof_of_billing) && { proof_of_billing: text.proof_of_billing },
                                            ...(text.barangay_id_number) && { barangay_id_number: text.barangay_id_number },
                                            ...(text.facebook_url) && { facebook_url: text.facebook_url },
                                            ...(text.address) && { address: text.address },
                                        })
                                    }}
                                >
                                    <AuditOutlined  />
                                </Button>
                            </Tooltip>
                        :
                            <Tag color={"#AD72B7"}>
                                Approved & Verified
                            </Tag>
                    }
                    
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, row) => (
                <Space size="middle">
                    {
                        text.status === false ?
                            <Tooltip title="Enable subscription">
                                <Button style={{ backgroundColor: "green", color: "white" }} onClick={async ()=> { 
                                    try{
                                        dispatch(changeLoader({ loading: true }))
                                        let approveData = await axiosAPI.post(`subscription/approve-listing`, {
                                            id: text._id
                                        });
                                        toasterRequest({ payloadType: "success", textString: approveData.data.message});
                                        let subscriptList = await axiosAPI.get(`subscription/listing?barangay=${barangay}`);
                                        setSubData(subscriptList.data.payload)
                                        dispatch(changeLoader({ loading: false }))
                                    } catch(err) {
                                        dispatch(changeLoader({ loading: false }))
                                        err.response ? 
                                            toasterRequest({ payloadType: "error", textString: err.response.data.message})
                                        :
                                            toasterRequest({ payloadType: "error", textString: err.message});
                                    }
                                }}>
                                    <ArrowRightOutlined  />
                                </Button>
                            </Tooltip>
                        :
                            <Tag color={"#AD72B7"}>
                                Approved & Verified
                            </Tag>
                    }
                </Space>
            ),
        }
    ];

    const getSubscriptionList = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let subscriptList = await axiosAPI.get(`subscription/listing?barangay=${barangay}`);
            let announcementList = await axiosAPI.get(`communication/listing/${barangay}`);
            console.log(subscriptList)
            setCommData(announcementList.data.payload)
            setSubData(subscriptList.data.payload)
            dispatch(changeLoader({ loading: false }))
        } catch(err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const createAnnouncementForm = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let formResult = await axiosAPI.post(`communication/create`, {
                ...createModalData,
                announcement_datetime: moment(createModalData.announcement_datetime).format("YYYY-MM-DD h:mm:ss"),
                barangay: barangay,
                requestor: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone_number: phone_number
                },
                send_right_now: sendAnnouncement
            });
            setCreateDrawer(false)
            setCreateModal(false)
            setSelectedComm({})
            toasterRequest({ payloadType: "success", textString: formResult.data.message});
            createForm.resetFields();
            getSubscriptionList();
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    useEffect(() => {
        getSubscriptionList();
    // eslint-disable-next-line
    }, []);

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    const updateAnnouncement = async (payload) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let formResult = await axiosAPI.post(`communication/update/${updateDrawerData._id}`, {
                _id: updateDrawerData._id,
                announcement: payload.announcement,
                message: payload.message,
                barangay: barangay,
                announcement_datetime: moment(payload.announcement_datetime).format("YYYY-MM-DD h:mm:ss"),
                requestor: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone_number: phone_number
                },
                send_right_now: sendAnnouncement
            });
            setUpdateDrawer(false);
            setSelectedComm({})
            getSubscriptionList();
            toasterRequest({ payloadType: "success", textString: formResult.data.message});
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const deleteAnnouncement = async (payload) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let formResult = await axiosAPI.post(`communication/update/${payload._id}`, {
                barangay: barangay,
                _id: payload._id,
                status: false
            });
            setSelectedComm({});
            getSubscriptionList();
            toasterRequest({ payloadType: "success", textString: formResult.data.message});
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const showPropsConfirm = (announcementData) => {
        confirm({
            title: 'Are you sure to delete this announcement?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Confirm',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                deleteAnnouncement(announcementData)
            }
        });
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Communication | Portal Silang Medical Services</title>
            </Helmet>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Communication" 
                    subTitle={dimension >= 4 ? `Announcements and other message by the Barnagay ${barangay} Officials.` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button icon={<MailOutlined />} key="3" onClick={() => { setCreateDrawer(true); setSendAnnouncement(false) }} style={{ color: "#AD72B7" }}>{dimension >= 4 ?  "Create Announcement" : dimension >= 1 ? "Create" : "" }</Button>,
                        <Button icon={<UserOutlined />} key="3" onClick={() => { setSubscriptionDrawer(true) }} style={{ color: "#AD72B7" }}>{dimension >= 4 ?  "Subscription List" : dimension >= 1 ? "List" : "" }</Button>
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Row gutter={dimension >= 4 ? [0, 0] : [0, 24]} >
                    <Col xs={{ span: 24 }} lg={{ span: 7 }}>
                        <Menu
                            style={{ width: "100%" }}
                            defaultOpenKeys={["announcement"]}
                            mode="inline"
                            className="comm-menu"
                            onClick={() => { 
                                titleRef.current.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            <Menu.SubMenu
                                key="announcement"
                                icon={<MailOutlined />}
                                title="Announcements"
                                disabled={true}
                            >
                                {
                                    commData.length !== 0 &&
                                    commData.slice(paginationNum === 1 ? 0 : Number(`${paginationNum-1}0`) , Number(`${paginationNum}0`)).map((data, commIndex) => {
                                        return <Menu.Item key={commIndex} onClick={() => { setSelectedComm(data) }}>{data.announcement}</Menu.Item>
                                    })
                                }
                            </Menu.SubMenu>
                        </Menu>
                        {
                            commData.length !== 0 && 
                            <div style={{ display: "flex", justifyContent: "center"}}>
                                <Pagination 
                                    current={paginationNum}
                                    total={commData.length}
                                    showSizeChanger={false}
                                    responsive={true}
                                    showLessItems={true}
                                    size="small"
                                    onChange={(pageNum)=>{ setPaginationNum(pageNum) }}
                                />
                            </div>
                        }
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 17 }} ref={titleRef}>
                        {
                            commData.length === 0 &&
                            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "calc(100vh - 64%) 0"}}>
                                <Empty description="No announcement has been made!"/>
                            </div>
                        }
                        {
                            selectedComm.requestor ? 
                            <Card title={selectedComm.announcement} extra={
                                moment(selectedComm.announcement_datetime) > moment() ?
                                <React.Fragment>
                                    <Button icon={<CloseCircleOutlined />} key="3" onClick={() => { showPropsConfirm(selectedComm) }} style={{ color: "#AD72B7", marginRight: "10px" }}>
                                        Delete
                                    </Button>
                                    <Button icon={<InfoCircleOutlined />} key="3" onClick={() => {
                                        setUpdateDrawer(true)
                                        setUpdateDrawerData(selectedComm)
                                        updateForm.setFieldsValue({
                                            announcement: selectedComm.announcement,
                                            message: selectedComm.message,
                                            announcement_datetime: moment(selectedComm.announcement_datetime),
                                        })
                                        setSendAnnouncement(false)
                                    }} style={{ color: "#AD72B7" }}>
                                        Update
                                    </Button>
                                </React.Fragment>
                                :
                                <React.Fragment />
                            } style={{ width: "100%", height: "100%" }}>
                                <Descriptions title="Announcement Details" ayout="vertical" bordered>
                                    <Descriptions.Item label="Message" span={3} className="display-linebreak">
                                        {selectedComm.message}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Announcement Date" span={1.5}>
                                        {moment(selectedComm.announcement_datetime).format("MMMM DD, YYYY")}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date Creation" span={1.5}>
                                        {moment(selectedComm.createdAt).format("MMMM DD, YYYY")}
                                    </Descriptions.Item>
                                </Descriptions>
                                <Descriptions title="Announcer Information" layout="vertical" bordered style={{ marginTop: "20px" }}>
                                    <Descriptions.Item label="First Name" span={2}>
                                        {selectedComm.requestor ? selectedComm.requestor.first_name : ""}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Last Name" span={2}>
                                        {selectedComm.requestor ? selectedComm.requestor.last_name : ""}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Email" span={2}>
                                        {selectedComm.requestor ? selectedComm.requestor.email : ""}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Phone Number" span={2}>
                                        {selectedComm.requestor ? selectedComm.requestor.phone_number : ""}
                                    </Descriptions.Item>
                                </Descriptions>
                                <p style={{ fontSize: "16px", fontWeight: 700, paddingTop: "20px"}}>Subscribed Citizen</p>
                                <Table columns={columns} dataSource={selectedComm.subscribed} scroll={{ x: 500 }} />
                            </Card>
                            :
                            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "25vh 0" }}>
                                <Empty description={
                                    <span>
                                        Select an announcement!
                                    </span>
                                }/>
                            </div>
                        }
                    </Col>
                </Row>
            </Layout.Content>
            <Drawer
                title={`Create Announcement`}
                width={dimension >= 4 ? "50%" : "100%"}
                closable={true}
                onClose={() => {
                    setCreateDrawer(false)
                }}
                visible={createDrawer}
            >
                <Form
                    onFinish={(formData) => { 
                        setCreateModal(true)
                        setCreateModalData(formData)
                    }}
                    layout="vertical"
                    form={createForm}
                >
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} >
                            <Divider orientation="left" plain orientationMargin={10}>
                                Announcement Details
                            </Divider>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="announcement"
                                        label="Announcement"
                                        tooltip="Announcement title"
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
                                        name="message"
                                        label="Message"
                                        tooltip="Reports, Memo, or any directive relating to the announcement"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 12 }}>
                                    <p style={{ fontSize: "14px", fontWeight: "400", paddingLeft: "10px" }}>Send announcement after submission?</p>
                                </Col>
                                <Col xs={{ span: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Switch checked={sendAnnouncement} onChange={() => { 
                                            setSendAnnouncement(!sendAnnouncement)
                                        }} />
                                    </div>
                                </Col>
                            </Row>
                            {
                                sendAnnouncement === true ?
                                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                        <Col xs={{ span: 24 }}>
                                            <Alert message="Announcement will be sent right after the form submission." type="info" />
                                        </Col>
                                    </Row>
                                :
                                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                        <Col xs={{ span: 24 }}>
                                            <Form.Item
                                                name="announcement_datetime"
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
                                                <DatePicker disabledDate={disabledDate} format="MM-DD-YYYY" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                            }
                        </Col>
                    </Row>
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => createForm.resetFields() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Confirm
                        </Button>
                    </Form.Item>
                </Form>
                <Modal title="Announcement Confirmation" visible={createModal} onOk={() => {
                    createAnnouncementForm()
                }} onCancel={() => {
                    createForm.setFieldsValue(createModalData)
                    setCreateModal(false)
                    setCreateModalData({})
                }}>
                    <Descriptions bordered>
                        <Descriptions.Item label="Announcement" span={3}>{createModalData.announcement}</Descriptions.Item>
                        <Descriptions.Item label="Message" span={3}>{createModalData.message}</Descriptions.Item>
                        <Descriptions.Item label="Announcement Date" span={1.5}>{createModalData.announcement_datetime ? moment(createModalData.announcement_datetime).format("MMMM DD,YYYY") : moment().format("MMMM DD,YYYY")}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            </Drawer>
            <Drawer
                title={`Update Announcement`}
                width={dimension >= 4 ? "50%" : "100%"}
                closable={true}
                onClose={() => {
                    setUpdateDrawer(false)
                }}
                visible={updateDrawer}
            >
                
                <Form
                    onFinish={(formData) => { 
                        updateAnnouncement(formData)
                    }}
                    layout="vertical"
                    form={updateForm}
                >
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} >
                            <Divider orientation="left" plain orientationMargin={10}>
                                Announcement Details
                            </Divider>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="announcement"
                                        label="Announcement"
                                        tooltip="Announcement title"
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
                                        name="message"
                                        label="Message"
                                        tooltip="Reports, Memo, or any directive relating to the announcement"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 12 }}>
                                    <p style={{ fontSize: "14px", fontWeight: "400", paddingLeft: "10px" }}>Send announcement after submission?</p>
                                </Col>
                                <Col xs={{ span: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Switch checked={sendAnnouncement} onChange={() => { 
                                            setSendAnnouncement(!sendAnnouncement)
                                        }} />
                                    </div>
                                </Col>
                            </Row>
                            {
                                sendAnnouncement === true ?
                                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                        <Col xs={{ span: 24 }}>
                                            <Alert message="Announcement will be sent right after the form submission." type="info" />
                                        </Col>
                                    </Row>
                                :
                                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                        <Col xs={{ span: 24 }}>
                                            <Form.Item
                                                name="announcement_datetime"
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
                                                <DatePicker disabledDate={disabledDate} format="MM-DD-YYYY" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                            }
                        </Col>
                    </Row>
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => updateForm.resetFields() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Confirm
                        </Button>
                    </Form.Item>
                </Form>
                <Modal title="Announcement Confirmation" visible={createModal} onOk={() => {
                    createAnnouncementForm()
                }} onCancel={() => {
                    updateForm.setFieldsValue(createModalData)
                    setCreateModal(false)
                    setCreateModalData({})
                }}>
                    <Descriptions bordered>
                        <Descriptions.Item label="Announcement" span={3}>{createModalData.announcement}</Descriptions.Item>
                        <Descriptions.Item label="Message" span={3}>{createModalData.message}</Descriptions.Item>
                        <Descriptions.Item label="Announcement Date" span={1.5}>{createModalData.announcement_datetime ? moment(createModalData.announcement_datetime).format("MMMM DD,YYYY") : moment().format("MMMM DD,YYYY")}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            </Drawer>
            <Drawer
                title={`Subscription List`}
                width={dimension >= 4 ? "75%" : "100%"}
                closable={true}
                onClose={() => {
                    setSubscriptionDrawer(false)
                }}
                visible={subscriptionDrawer}
                className="subscription-list"
            >
                {
                    console.log(subData)
                }
                <Table columns={subscriptionColumns} dataSource={subData} scroll={{ x: 500 }} />
            </Drawer>
            <Modal
                title={selectedVerificationDetailsData.title}
                visible={selectedVerificationDetails}
                onCancel={() => {
                    setSelectedVerificationDetails(!selectedVerificationDetails)
                }}
                onOk={() => {
                    setSelectedVerificationDetails(!selectedVerificationDetails)
                }}
            >
                <Descriptions bordered layout="vertical">
                        { selectedVerificationDetailsData.address && <Descriptions.Item label="Full Address" span={3}>{selectedVerificationDetailsData.address}</Descriptions.Item> }
                        { selectedVerificationDetailsData.facebook_url && <Descriptions.Item label="Facebook URL" span={3}>{selectedVerificationDetailsData.facebook_url}</Descriptions.Item> }
                        { selectedVerificationDetailsData.barangay_id_number && <Descriptions.Item label="Barangay ID Number" span={3}>{selectedVerificationDetailsData.barangay_id_number}</Descriptions.Item> } 
                        { selectedVerificationDetailsData.vaccine_card && <Descriptions.Item label="Vaccine Card" span={3}><img alt="example" style={{ width: '100%', height: "auto" }} src={selectedVerificationDetailsData.vaccine_card} galleryimg="no"/></Descriptions.Item> }
                        { selectedVerificationDetailsData.proof_of_billing && <Descriptions.Item label="Proof of Billing" span={3}><img alt="example" style={{ width: '100%', height: "auto" }} src={selectedVerificationDetailsData.proof_of_billing} galleryimg="no"/></Descriptions.Item> }
                        { selectedVerificationDetailsData.any_id && <Descriptions.Item label="General ID" span={1.5}><img alt="example" style={{ width: '100%', height: "auto" }} src={selectedVerificationDetailsData.any_id} galleryimg="no"/></Descriptions.Item> }
                </Descriptions>
            </Modal>
        </React.Fragment>
    );
};

export default Communication;
