import React, { useState, useEffect } from 'react'
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { useSelector, useDispatch } from "react-redux";
import Header from "../medical-record/record-header.png";
import { Avatar, Image, Divider, Empty, Row, Col, Card, Tooltip, Space, Drawer, Layout, Typography, List, Descriptions, Badge } from 'antd';
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
    const [announcementDrawer, setAnnouncementDrawer] = useState(false);
    const [eventData, setEventData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [eventDrawer, setEventDrawer] = useState(false);
    const [addEventAttendee, setAddEventAttendee] = useState(false);
    const [removeEventAttandee, setRemoveEventAttandee] = useState(false);
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
                        <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500, padding: "20px 0"}}>Announcements ({moment().format("YYYY")})</Divider>
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
                        <Row gutter={[24, 0]} >
                            {
                                // announcementData.length !== 0 &&
                                <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                                    <Card
                                        actions={[
                                            <Tooltip title="Read More" >
                                                <EllipsisOutlined key="ellipsis" 
                                                    onClick={() => {
                                                        setAnnouncementDrawer(true)
                                                    }}
                                                />
                                            </Tooltip>,
                                        ]}
                                    >
                                        <Card.Meta
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Card>
                                </Col>
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
                        <Row gutter={[24, 0]} >
                            {
                                eventData.length !== 0 &&
                                eventData.map(eventData => {
                                    const basis = moment(new Date()).format("MMMM DD,YYYY") > moment(eventData.start_datetime).format("MMMM DD,YYYY");
                                    const actionsTrue = [
                                        <Tooltip title="Attend Event" >
                                            <PlusCircleOutlined
                                                onClick={() => {
                                                    setAddEventAttendee(true)
                                                }}
                                            />
                                        </Tooltip>,            
                                        <Tooltip title="Remove Attendee" >
                                            <MinusCircleOutlined 
                                                onClick={() => {
                                                    setRemoveEventAttandee(true)
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
                title={`Add Event Attendee`}
                width={dimension >= 4 ? 500 : 300}
                closable={true}
                onClose={() => {
                    setAddEventAttendee(false)
                }}
                visible={addEventAttendee}
            >
            </Drawer>
            <Drawer
                title={`Remove Event Attendee`}
                width={dimension >= 4 ? 500 : 300}
                closable={true}
                onClose={() => {
                    setRemoveEventAttandee(false)
                }}
                visible={removeEventAttandee}
            >
            </Drawer>
            <Drawer
                title={`Announcement Data `}
                width={dimension >= 4 ? 500 : 300}
                closable={true}
                onClose={() => {
                    setAnnouncementDrawer(false)
                }}
                visible={announcementDrawer}
            >
            </Drawer>
            <Drawer
                title={`Event Data ${selectedEvent._id}`}
                width={dimension >= 4 ? 500 : 300}
                closable={true}
                onClose={() => {
                    setEventDrawer(false)
                }}
                visible={eventDrawer}
            >
                <Descriptions title="Event Information" bordered style={{ margin: "5px 0 5px 0" }}>
                    <Descriptions.Item label="Event" span={3}>{selectedEvent.event}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>{selectedEvent.description}</Descriptions.Item>
                    <Descriptions.Item label="Start Date & Time" span={3}>{selectedEvent.start_datetime}</Descriptions.Item>
                    <Descriptions.Item label="End Date & Time" span={3}>{selectedEvent.end_datetime}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Requestor Information" bordered style={{ margin: "15px 0 5px 0" }}>
                    <Descriptions.Item label="First Name" span={3}>{selectedEvent.requestor === undefined ? "" : selectedEvent.requestor.first_name }</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{selectedEvent.requestor === undefined ? "" : selectedEvent.requestor.email}</Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={3}>{selectedEvent.requestor === undefined ? "" : selectedEvent.requestor.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number" span={3}>{selectedEvent.requestor === undefined ? "" : selectedEvent.requestor.phone_number}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="Record Information" bordered style={{ margin: "15px 0 15px 0" }}>
                    <Descriptions.Item label="Date Creation" span={3}>{selectedEvent.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Last Accessed" span={3}>{selectedEvent.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="Created By" span={3}>{selectedEvent.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Approved By" span={3}>{selectedEvent.approvedBy}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge
                            status={
                            selectedEvent.status === true ? 
                                moment(new Date()) > moment(eventData.data.payload.start_datetime) ?
                                "success"
                                :
                                "warning"
                            : 
                                "default"
                            }
                            text={selectedEvent.status=== true ? 
                                moment(new Date()) > moment(eventData.data.payload.start_datetime) ?
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

