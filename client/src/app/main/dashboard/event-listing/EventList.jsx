import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Layout, PageHeader, Button, Modal, Empty, Row, Col, Card, Statistic} from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { addCellData, resetCell } from "src/app/store/calendar/calendarInformation";
import "./eventTable.scss"
import { CalendarOutlined } from "@ant-design/icons";

const DataCell = (value) => {
    const { cell } = useSelector((state) => state.calendar); 
    return (
        <ul className="events">
            {
                cell[`${moment(value).format("YYYY/MM/DD")}`] !== undefined &&
                cell[`${moment(value).format("YYYY/MM/DD")}`].map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))
            }
        </ul>
    );
}

const EventList = () => {
    const { dimension } = useSelector((state) => state.web); 
    const { barangay } = useSelector((state) => state.user); 
    const { cell } = useSelector((state) => state.calendar);
    const [cellModal, setCellModal] = useState(false);
    const history = useNavigate();
    const dispatch = useDispatch();
    const [eventsDate, setEventsDate] = useState({
        value: moment(new Date()),
        selectedValue: moment(new Date())
    });
    const [analyticsData, setAnalyticsData] = useState({
        finished: 0,
        upcoming: 0,
        awaiting: 0
    });
    const onSelect = dateVal => {
        setEventsDate((prevData) => {
            return {
                ...prevData,
                selectedValue: dateVal
            }
        })
        setCellModal(true)
    };

    const onPanelChange = value => {
        setEventsDate((prevData) => {
            return {
                ...prevData,
                value: value
            }
        })
    };

    const getCellData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.get(`events/private-list?barangay=${barangay}`);
            dispatch(changeLoader({ loading: false }));
            dispatch(addCellData({
                cell: eventData.data.payload
            }));
            setAnalyticsData({
                finished: eventData.data.analytics.finished,
                upcoming: eventData.data.analytics.upcoming,
                awaiting: eventData.data.analytics.awaiting
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
        dispatch(resetCell())
        getCellData()
    // eslint-disable-next-line
    }, [])
    
    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Event Listing" 
                    subTitle={dimension >= 4 ? "Contains all the activities and missions of the Barangay Healthcare." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button icon={<CalendarOutlined />} key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/event-listing/create`
                            })
                        }} style={{ color: "#AD72B7" }}>Create Event</Button>
                    ]}
                />
            </Layout.Content>
            <Row gutter={[24, 0]} style={{ padding: dimension >= 4 ? "10px 0 10px 0" : "10px 0",  borderRadius: "5px" }}>
                <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: "15px" }}>
                    <Card title="Calendar Legend" bordered={false} style={{ width: "100%" }}>
                        <Badge status="success" text="Event has occured or is currently on-going." />
                        <br />
                        <Badge status="default" text="Event has not been accepted or not yet approved." />
                        <br />
                        <Badge status="warning" text="Upcoming Events." />
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ marginBottom: "15px" }}>
                    <Card title="Event Analytics" bordered={false} style={{ width: "100%" }}>
                        <Row>
                            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                <Statistic title="Finished" value={analyticsData.finished} />
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                <Statistic title="Upcoming" value={analyticsData.upcoming} />
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                <Statistic title="Awaiting Approval" value={analyticsData.awaiting} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Layout.Content style={{ backgroundColor: "white", padding: "20px", marginBottom: "15px", borderRadius: "5px" }}>
                {/* <Alert message={`You selected date: ${eventsDate.selectedValue && eventsDate.selectedValue.format('YYYY-MM-DD')}`}/> */}
                <Calendar dateCellRender={DataCell} mode={"month"} value={eventsDate.value} onSelect={onSelect} onPanelChange={onPanelChange} />
            </Layout.Content>
            <Modal title={moment(eventsDate.selectedValue).format("MMMM DD,YYYY")} visible={cellModal} closable={false}  onOk={() => { setCellModal(false) }} okText="Close" className="event-modal">
                {
                    cell[`${moment(eventsDate.selectedValue).format("YYYY/MM/DD")}`] !== undefined &&
                    cell[`${moment(eventsDate.selectedValue).format("YYYY/MM/DD")}`].map((item) => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} className="hoverable-badge" onClick={() => {
                                history({
                                    pathname: `/dashboard/event-listing/view/${item.id}`
                                })
                            }}/>
                        </li>
                    ))
                }
                {
                    cell[`${moment(eventsDate.selectedValue).format("YYYY/MM/DD")}`] === undefined &&
                    <Empty />
                }
            </Modal>
        </React.Fragment>
    );
};

export default EventList;
