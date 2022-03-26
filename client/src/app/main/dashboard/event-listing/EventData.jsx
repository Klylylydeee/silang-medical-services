import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Layout, PageHeader, Button, Descriptions, Badge, Space, Tooltip, Tag, Modal } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { DisconnectOutlined } from "@ant-design/icons";
import { Table } from "ant-table-extensions";
import { CalendarOutlined, UserOutlined, FileExcelOutlined, AuditOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";

const EventData = () => {
    const { dimension } = useSelector((state) => state.web); 
    const { barangay } = useSelector((state) => state.user); 
    const params = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        event: "",
        description: "",
        start_datetime: "",
        end_datetime: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        createdAt: "",
        updatedAt: "",
        badgeText: "",
        textData: "",
        createdBy: "",
        approvedBy: "",
        type: ""
    })
    const [ data, setData ] = useState([]);
    
    const [selectedVerificationDetails, setSelectedVerificationDetails] = useState(false);
    const [selectedVerificationDetailsData, setSelectedVerificationDetailsData] = useState({});

    const getCellData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.get(`events/event?id=${params.id}&barangay=${barangay}`);
            setFormData({
                event: eventData.data.payload.event,
                description: eventData.data.payload.description,
                start_datetime: moment(eventData.data.payload.start_datetime).format("MMMM DD,YYYY - h:mm A"),
                end_datetime: moment(eventData.data.payload.end_datetime).format("MMMM DD,YYYY - h:mm A"),
                first_name: eventData.data.payload.requestor.first_name,
                last_name: eventData.data.payload.requestor.last_name,
                phone_number: eventData.data.payload.requestor.phone_number,
                email: eventData.data.payload.requestor.email,
                createdAt: moment(eventData.data.payload.createdAt).format("MMMM DD,YYYY - h:mm A"),
                updatedAt: moment(eventData.data.payload.updatedAt).format("MMMM DD,YYYY - h:mm A"),
                badgeText: eventData.data.payload.status === true ? 
                    moment(new Date()) > moment(eventData.data.payload.start_datetime) ?
                    "success"
                    :
                    "warning"
                : 
                    "default",
                textData: eventData.data.payload.status === true ? 
                    moment(new Date()) > moment(eventData.data.payload.start_datetime) ?
                    "Event has occured or is currently on-going."
                    :
                    "Upcoming event."
                : 
                    "Event is awaiting for approval.",
                createdBy: eventData.data.payload.createdBy,
                approvedBy: eventData.data.payload.approvedBy,
                type: eventData.data.payload.type
            })
            setData(eventData.data.payload.attendee)
            dispatch(changeLoader({ loading: false }));
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const removedAttendee = async (attendeeId) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.post(`events/remove-listing-attendee?id=${params.id}&barangay=${barangay}`, {
                id: attendeeId
            });
            toasterRequest({ payloadType: "success", textString: eventData.data.message});
            getCellData()
            dispatch(changeLoader({ loading: false }));
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }
                
    const columns = [
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
            title: 'Contact Details',
            key: 'contact details',
            render: (text, row) => (
                <Space size="middle">
                    <p>{text.email}/{text.phone_number}</p>
                </Space>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, row) => (
                <Space size="middle">
                    {
                        text.isApproved === true ?
                        <p>{text.status}</p>
                        :
                        <Tag color={"#FCA300"}>
                            Awaiting for approval
                        </Tag>
                    }
                </Space>
            ),
        },
        {
            title: 'Verification',
            key: 'action',
            render: (text, row) => (
                <Space size="middle">
                    {
                        text.isApproved === false ?
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
                    <Tooltip title="Remove Attendee">
                        <Button type="danger" onClick={()=> { 
                            removedAttendee(text._id)
                         }}>
                            <DisconnectOutlined />
                        </Button>
                    </Tooltip>
                    {
                        text.isApproved === false &&
                        <Tooltip title="Approve Attendee">
                            <Button style={{ backgroundColor: "green", color: "white" }} onClick={async ()=> { 
                                try{
                                    dispatch(changeLoader({ loading: true }))
                                    let approveData = await axiosAPI.post(`events/approve-listing-attendee?id=${text._id}`);
                                    toasterRequest({ payloadType: "success", textString: approveData.data.message});
                                    getCellData();
                                    dispatch(changeLoader({ loading: false }));
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
                    }
                </Space>
            ),
        }
    ];

    const fields = {
        full_name: {
            header: "Full Name",
            formatter: (_fieldValue, record) => {
                return record.first_name + " " + record.last_name;
            },
        },
        email: {
            header: "Email",
            formatter: (_fieldValue, record) => {
                return record.email;
            },
        },
        phone_number: {
            header: "Phone Number",
            formatter: (_fieldValue, record) => {
                return `${String(record.phone_number).substring(0, 3)}-${String(record.phone_number).substring(3, 6)}-${String(record.phone_number).substring(6, 9)}-${String(record.phone_number).substring(9, 12)}`;
            },
        },
        status: {
            header: "Status",
            formatter: (_fieldValue, record) => {
                return record.isApproved === true ? `Approved` : `Awaiting for approval`;
            },
        }
    }

    const btnProps =  {
        type: "primary",
        icon: <FileExcelOutlined />,
        children: <span>Export to EXCEL</span>
    }

    useEffect(() => {
        getCellData()
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
                    title="Event Listing" 
                    subTitle={dimension >= 4 ? `Contains all the data for the event ${params.id}` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button icon={<CalendarOutlined />} key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/event-listing/update/${params.id}`
                            })
                        }} style={{ color: "#AD72B7" }}>{dimension >= 4 ?  "Update Event Details" : dimension >= 1 ? "Update" : "" }</Button>,
                        <Button icon={<UserOutlined />} key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/event-listing/add-attendee/${params.id}`
                            })
                        }} style={{ color: "#AD72B7" }}>{dimension >= 4 ?  "Add Attendee" : dimension >= 1 ? "Add" : "" }</Button>
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Descriptions title="Event Information" bordered style={{ margin: "5px 0 5px 0" }} layout={dimension >= 3 ? "horizontal" : "vertical"}>
                    <Descriptions.Item label="Event" span={3}>{formData.event}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{formData.description}</Descriptions.Item>
                    <Descriptions.Item label="Start Date & Time" span={1.5}>{formData.start_datetime}</Descriptions.Item>
                    <Descriptions.Item label="End Date & Time" span={1.5}>{formData.end_datetime}</Descriptions.Item>

                </Descriptions>
                <Descriptions title="Requestor Information" bordered style={{ margin: "15px 0 5px 0" }} layout={dimension >= 3 ? "horizontal" : "vertical"}>
                    <Descriptions.Item label="First Name" span={1.5}>{formData.first_name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={1.5}>{formData.email}</Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={1.5}>{formData.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number" span={1.5}>{formData.phone_number}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Record Information" bordered style={{ margin: "15px 0 15px 0" }} layout={dimension >= 3 ? "horizontal" : "vertical"}>
                    <Descriptions.Item label="Date Creation" span={1.5}>{formData.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Last Accessed" span={1.5}>{formData.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="Created By" span={1.5}>{formData.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Approved By" span={1.5}>{formData.approvedBy}</Descriptions.Item>
                    <Descriptions.Item label="Type" span={1.5}>{formData.type}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={1.5}>
                        <Badge status={formData.badgeText} text={formData.textData} /></Descriptions.Item>
                    </Descriptions>
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <p style={{ fontSize: "16px", fontWeight: 700, paddingTop: "15px"}}>Event Attendee</p>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 500 }}
                    searchable
                    exportableProps={{ 
                        fields,
                        showColumnPicker: true,
                        btnProps: btnProps,
                        fileName: "event-attendee",
                        disabled: data.length === 0 ? true : false
                    }}
                    searchableProps={{ fuzzySearch: true }}
                />
            </Layout.Content>
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

export default EventData;
