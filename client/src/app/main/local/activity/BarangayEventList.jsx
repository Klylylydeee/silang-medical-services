import React, { useState, useEffect } from 'react'
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { useSelector, useDispatch } from "react-redux";
import Header from "../medical-record/record-header.png";
import { Avatar, Image, Divider, Empty, Row, Col, Card, Tooltip, Button, Drawer, Form, Input, Select, Descriptions, Badge, Alert } from 'antd';
import { EllipsisOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Navigation from "../landing/Navigation";
import Lumil from "../img/barangay-lumil.png"
import Grid from "../img/black-grid.png"
import PK from "../img/barangay-putingkahoy.png"
import Footer from "../medical-record/footer.png"
import moment from "moment";

const BarangayEvent = () => {
    const { dimension } = useSelector((state) => state.web);
    const paramsa = useParams();
    // {paramsa.barangay}-{paramsa.id}
    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [newHeight, setHeight] = useState("")
    const [announcementData, setAnnouncementData] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState({});
    const [subscribe, setSubscribe] = useState(false);
    const [announcementDrawer, setAnnouncementDrawer] = useState(false);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [eventDrawer, setEventDrawer] = useState(false);
    const [addEventAttendee, setAddEventAttendee] = useState(false);
    const [removeEventAttandee, setRemoveEventAttandee] = useState(false);
    const [addAttendeeForm] = Form.useForm();
    const [removeAttendeeForm] = Form.useForm();
    const [subscribeForm] = Form.useForm();
    useEffect(() => {
            const heightDiv = document.getElementById("test")
            const offset = heightDiv.offsetHeight;
            const newHeight = offset
            setHeight(`${newHeight}px`)
    // eslint-disable-next-line
    }, [dimension])
    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(changeLoader({ loading: true }))
                const getPayloadData = await axiosAPI.get(`events/public/event-and-announcement?barangay=${paramsa.barangay}`);
                setAnnouncementData(getPayloadData.data.payload.announcements)
                setEventData(getPayloadData.data.payload.events)
                dispatch(changeLoader({ loading: false }))
                setTimeout(()=>{
                    const heightDiv = document.getElementById("test")
                    const offset = heightDiv.offsetHeight;
                    const newHeight = offset
                    setHeight(`${newHeight}px`)
                }, 200)
            } catch (err) {
                dispatch(changeLoader({ loading: false }))
                err.response ? 
                    toasterRequest({ payloadType: "error", textString: err.response.data.message === "jwt expired" ? "Authentication expired" : "Authentication incorrect!"})
                :
                    toasterRequest({ payloadType: "error", textString: err.message === "jwt expired" ? "Authentication expired" : "Authentication incorrect!"});
                history({
                    pathname: `/`
                })
            }
        }
        getData()
    // eslint-disable-next-line
    }, [])

    const attendeeForm = async ({ prefix, email, last_name, first_name, phone_number }) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let userCreate = await axiosAPI.post(`events/update-listing-attendee?id=${selectedEvent._id}&barangay=${paramsa.barangay}`, {
                first_name,
                last_name,
                email,
                phone_number: prefix + phone_number
            });
            dispatch(changeLoader({ loading: false }));
            setAddEventAttendee(false)
            toasterRequest({ payloadType: "success", textString: userCreate.data.message});
            addAttendeeForm.resetFields();
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }
    const removedAttendee = async (formPayload) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.post(`events/remove-listing-attendee?id=${selectedEvent._id}&barangay=${paramsa.barangay}`, {
                email: formPayload.email,
                phone_number: formPayload.prefix+formPayload.phone_number
            });
            toasterRequest({ payloadType: "success", textString: eventData.data.message});
            dispatch(changeLoader({ loading: false }));
            setRemoveEventAttandee(false)
            removeAttendeeForm.resetFields();
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }
    const subscribeCitizen = async ({ prefix, email, last_name, first_name, phone_number }) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let userCreate = await axiosAPI.post(`subscription/`, {
                first_name,
                last_name,
                email,
                phone_number: prefix + phone_number,
                barangay: paramsa.barangay
            });
            dispatch(changeLoader({ loading: false }));
            setSubscribe(false)
            toasterRequest({ payloadType: "success", textString: userCreate.data.message});
            subscribeForm.resetFields();
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
            <Navigation />
            <div
                style={{
                    position: "relative",
                    backgroundColor: "#EEEEEE",
                }}
            >
                <div 
                    style={{ 
                        backgroundImage: `url(${Header})`,
                        backgroundSize: "cover",
                        minHeight: "85vh",
                        marginTop: dimension >= 4 ? "10vh" : "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: dimension >= 4 ? "row" : "column"
                    }}
                >
                    <Avatar src={<Image src={paramsa.barangay === "Lumil" ? Lumil : PK}/>} size={dimension >= 4 ? 175 : 150} style={{ margin: dimension >= 4 ? "0px" : "75px 0 15px 0" }} shape="circle" />
                    <div style={{ padding: dimension >= 4 ? "0 0 0 75px" : "0 0 75px 0", margin: 0, color: "white", fontSize: "42px", fontWeight: 500 }}>
                        <p>
                            Barangay {paramsa.barangay}
                        </p>
                        <p style={{ lineHeight: "30px", padding: 0, margin: 0, fontSize: "18px", fontWeight: 400, textAlign: dimension >= 4 ? "center" : ""  }}>
                            Events and Announcements
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        position: "relative",
                        height: newHeight,
                        margin: "0 30px",
                        padding: "75px 0",
                    }}
                >
                    <div 
                        style={{
                            position: "absolute",
                            backgroundColor: "white",
                            top: dimension >= 4 ? -30 : 0,
                            width: "100%",
                            padding: "75px 35px"
                        }}
                        id="test"
                    >
                        <p style={{
                            position: "relative",
                            fontWeight: 500
                        }}>
                            Reference Guide. All data presented in the following list below are based on the current year and record made by your respective barangay officials.
                            <img src={Grid} alt=""
                                style={{
                                    position: "absolute",
                                    height: "60px",
                                    width: "auto",
                                    top: -25,
                                    left: -60
                                }}
                            />
                        </p>
                        <Row gutter={[24, 0]} style={{ padding: "20px 0", position: "relative"}} wrap={false}>
                            <Col flex="auto">
                                <Divider orientation="left" plain orientationMargin={10} style={{ fontSize: "18px", color: "black", fontWeight: 500, }}>
                                    Announcements ({moment().format("YYYY")})
                                </Divider>
                            </Col>
                            <Col flex={"130px"}>
                                <Button 
                                    type="primary"
                                    onClick={()=> { 
                                        setSubscribe(true)
                                    }}
                                    style={{ position: "absolute", top: 0, bottom: 0, margin: "auto 0"}}
                                >
                                    Subscribe
                                </Button>
                            </Col>
                        </Row>
                        {
                            announcementData.length === 0 &&
                            <div
                                style={{
                                    height: "100%"
                                }}
                            >
                                <Empty description="Currently no announcement has been made!"/>
                            </div>
                        }
                        <Row gutter={[24, 24]} >
                            {
                                announcementData.length !== 0 &&
                                announcementData.map((data) => {
                                    return (
                                        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                                            <Card
                                                actions={[
                                                    <Tooltip title="Read More" >
                                                        <EllipsisOutlined key="ellipsis" 
                                                            onClick={() => {
                                                                setAnnouncementDrawer(true)
                                                                setSelectedAnnouncement(data)
                                                            }}
                                                        />
                                                    </Tooltip>,
                                                ]}
                                            >
                                                <Card.Meta
                                                    title={`${data.announcement}`}
                                                    description={`${moment(data.announcement_datetime).format("MMMM DD, YYYY")}`}
                                                />
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500, padding: "20px 0"}}>General and Medical Events  ({moment().format("YYYY")})</Divider>
                        {/*  */}
                        {
                            eventData.length === 0 &&
                            <div
                                style={{
                                    height: "100%"
                                }}
                            >
                                <Empty description="No matching record found!"/>
                            </div>
                        }
                        <Row gutter={[24, 24]} >
                            {
                                eventData.length !== 0 &&
                                eventData.map(eventData => {
                                    const basis = moment(new Date()).format("MMMM DD,YYYY") > moment(eventData.start_datetime).format("MMMM DD,YYYY");
                                    const actionsTrue = [
                                        <Tooltip title="Attend Event" >
                                            <PlusCircleOutlined
                                                onClick={() => {
                                                    setAddEventAttendee(true)
                                                    setSelectedEvent(eventData)
                                                }}
                                            />
                                        </Tooltip>,            
                                        <Tooltip title="Remove Attendee" >
                                            <MinusCircleOutlined 
                                                onClick={() => {
                                                    setRemoveEventAttandee(true)
                                                    setSelectedEvent(eventData)
                                                }}
                                            />
                                        </Tooltip>,
                                        <Tooltip title="Read More" >
                                            <EllipsisOutlined key="ellipsis"
                                                onClick={() => {
                                                    setEventDrawer(true)
                                                    setSelectedEvent(eventData)
                                                }}
                                            />
                                        </Tooltip>
                                    ]
                                    const actionsFalse = [
                                        <Tooltip title="Read More" >
                                            <EllipsisOutlined key="ellipsis"
                                                onClick={() => {
                                                    setEventDrawer(true)
                                                    setSelectedEvent(eventData)
                                                }}
                                            />
                                        </Tooltip>
                                    ]
                                    return (
                                        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                                            <Card
                                                actions={!basis ? actionsTrue : actionsFalse}
                                            >
                                                <Card.Meta
                                                    title={eventData.event}
                                                    description={eventData.description}
                                                />
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <img src={Footer} alt=""
                        style={{
                            position: "absolute",
                            height: "50px",
                            width: "auto",
                            bottom: dimension >= 4 ? 40 : 0,
                            right: -10
                        }}
                    />
                </div>
            </div>
            <Drawer
                title={`Subscribe to ${paramsa.barangay} Announcements`}
                width={dimension >= 4 ? "50%" : "100%"}
                closable={true}
                onClose={() => {
                    setSubscribe(false)
                }}
                visible={subscribe}
            >
                <Alert message="REMINDER. Once you have enlisted your credential for this subscription list it will be permanently listed." type="info" closeText="Close Now" />
                <Form
                    onFinish={subscribeCitizen}
                    layout="vertical"
                    form={subscribeForm}
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
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => subscribeForm.resetFields() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title={`Add Event Attendee`}
                width={dimension >= 4 ? "50%" : "100%"}
                closable={true}
                onClose={() => {
                    setAddEventAttendee(false)
                }}
                visible={addEventAttendee}
            >
                <Form
                    onFinish={attendeeForm}
                    layout="vertical"
                    form={addAttendeeForm}
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
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => addAttendeeForm.resetFields() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title={`Remove Event Attendee`}
                width={dimension >= 4 ? "50%" : "100%"}
                closable={true}
                onClose={() => {
                    setRemoveEventAttandee(false)
                }}
                visible={removeEventAttandee}
            >
                <Form
                    onFinish={removedAttendee}
                    layout="vertical"
                    form={removeAttendeeForm}
                >
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} >
                            <Divider orientation="left" plain orientationMargin={10}>
                                Personal Details
                            </Divider>
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
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => removeAttendeeForm.resetFields() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title={`${selectedAnnouncement.announcement}`}
                width={dimension >= 4 ? "500" : "100%"}
                closable={true}
                onClose={() => {
                    setAnnouncementDrawer(false)
                }}
                visible={announcementDrawer}
            >  
                <Descriptions title="Announcement Details" ayout="vertical" bordered>
                    <Descriptions.Item label="Message" span={3}>
                        {selectedAnnouncement.message}
                    </Descriptions.Item>
                    <Descriptions.Item label="Announcement Date" span={1.5}>
                        {moment(selectedAnnouncement.announcement_datetime).format("MMMM DD, YYYY")}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Announcer Information" layout="vertical" bordered style={{ marginTop: "20px" }}>
                    <Descriptions.Item label="First Name" span={2}>
                        {selectedAnnouncement.requestor ? selectedAnnouncement.requestor.first_name : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={2}>
                        {selectedAnnouncement.requestor ? selectedAnnouncement.requestor.last_name : ""}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
            <Drawer
                title={`Event Data`}
                width={dimension >= 4 ? "50%" : "100%"}
                closable={true}
                onClose={() => {
                    setEventDrawer(false)
                }}
                visible={eventDrawer}
            >
                <Descriptions title="Event Information" bordered style={{ margin: "5px 0 5px 0" }}>
                    <Descriptions.Item label="Event" span={3}>{selectedEvent.event}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{selectedEvent.description}</Descriptions.Item>
                    <Descriptions.Item label="Start Date & Time" span={3}>{moment(selectedEvent.start_datetime).format("MMMM DD, YYYY h:m a")}</Descriptions.Item>
                    <Descriptions.Item label="End Date & Time" span={3}>{moment(selectedEvent.end_datetime).format("MMMM DD, YYYY h:m a")}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Requestor Information" bordered style={{ margin: "15px 0 5px 0" }}>
                    <Descriptions.Item label="First Name" span={3}>{selectedEvent.requestor === undefined ? "" : selectedEvent.requestor.first_name }</Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={3}>{selectedEvent.requestor === undefined ? "" : selectedEvent.requestor.last_name}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Record Information" bordered style={{ margin: "15px 0 15px 0" }}>
                    <Descriptions.Item label="Date Creation" span={3}>{moment(selectedEvent.createdAt).format("MMMM DD, YYYY h:m a")}</Descriptions.Item>
                    <Descriptions.Item label="Last Accessed" span={3}>{moment(selectedEvent.updatedAt).format("MMMM DD, YYYY h:m a")}</Descriptions.Item>
                    <Descriptions.Item label="Created By" span={3}>{selectedEvent.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Approved By" span={3}>{selectedEvent.approvedBy}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge
                            status={
                            selectedEvent.status === true ? 
                                moment(new Date()) > moment(selectedEvent.start_datetime) ?
                                "success"
                                :
                                "warning"
                            : 
                                "default"
                            }
                            text={selectedEvent.status=== true ? 
                                moment(new Date()) > moment(selectedEvent.start_datetime) ?
                                "Event has occured or is currently on-going."
                                :
                                "Upcoming event."
                            : 
                                "Event is awaiting for approval."
                            }
                        /></Descriptions.Item>
                </Descriptions>
            </Drawer>



        </React.Fragment>
    );
}

export default BarangayEvent

