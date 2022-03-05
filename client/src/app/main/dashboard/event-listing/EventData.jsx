import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Layout, PageHeader, Button, Descriptions, Badge, Space, Tooltip } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { DisconnectOutlined } from "@ant-design/icons";
import { Table } from "ant-table-extensions";

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
        approvedBy: ""
    })
    const [ data, setData ] = useState([]);

    const getCellData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.get(`events/event?id=${params.id}&barangay=${barangay}`);
            setFormData({
                event: eventData.data.payload.event,
                description: eventData.data.payload.description,
                start_datetime: moment(eventData.data.payload.start_datetime).format("MMMM DD,YYYY - h:MM A"),
                end_datetime: moment(eventData.data.payload.end_datetime).format("MMMM DD,YYYY - h:MM A"),
                first_name: eventData.data.payload.requestor.first_name,
                last_name: eventData.data.payload.requestor.last_name,
                phone_number: eventData.data.payload.requestor.phone_number,
                email: eventData.data.payload.requestor.email,
                createdAt: moment(eventData.data.payload.createdAt).format("MMMM DD,YYYY - h:MM A"),
                updatedAt: moment(eventData.data.payload.updatedAt).format("MMMM DD,YYYY - h:MM A"),
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
                approvedBy: eventData.data.payload.approvedBy
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
            title: "First Name",
            dataIndex: "first_name",
            key: "First Name",
            width: "20%",
            sorter: (a, b) => a.first_name.length - b.first_name.length
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "Last Name",
            width: "20%",
            sorter: (a, b) => a.last_name.length - b.last_name.length
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "Email",
            width: "20%",
            sorter: (a, b) => a.email.length - b.email.length
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "Phone Number",
            width: "20%",
            sorter: (a, b) => a.phone_number.length - b.phone_number.length
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
                </Space>
            ),
        }
    ];

    useEffect(() => {
        getCellData()
    // eslint-disable-next-line
    }, []);
    
    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Event Listing" 
                    subTitle={dimension >= 4 ? `Contains all the data for the event ${params.id}` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/event-listing/update/${params.id}`
                            })
                        }} style={{ color: "#AD72B7" }}>Update Event Details</Button>,
                        <Button key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/event-listing/add-attendee/${params.id}`
                            })
                        }} style={{ color: "#AD72B7" }}>Add Attendee</Button>,
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Descriptions title="Event Information" bordered style={{ margin: "5px 0 5px 0" }}>
                    <Descriptions.Item label="Event" span={3}>{formData.event}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{formData.description}</Descriptions.Item>
                    <Descriptions.Item label="Start Date & Time" span={1.5}>{formData.start_datetime}</Descriptions.Item>
                    <Descriptions.Item label="End Date & Time" span={1.5}>{formData.end_datetime}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Requestor Information" bordered style={{ margin: "15px 0 5px 0" }}>
                    <Descriptions.Item label="First Name" span={1.5}>{formData.first_name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={1.5}>{formData.email}</Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={1.5}>{formData.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number" span={1.5}>{formData.phone_number}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Record Information" bordered style={{ margin: "15px 0 15px 0" }}>
                    <Descriptions.Item label="Date Creation" span={1.5}>{formData.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Last Accessed" span={1.5}>{formData.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="Created By" span={1.5}>{formData.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Approved By" span={1.5}>{formData.approvedBy}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status={formData.badgeText} text={formData.textData} /></Descriptions.Item>
                </Descriptions>
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <p style={{ fontSize: "16px", fontWeight: 700, paddingTop: "15px"}}>Event Attendee</p>
                <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
            </Layout.Content>
        </React.Fragment>
    );
};

export default EventData;
