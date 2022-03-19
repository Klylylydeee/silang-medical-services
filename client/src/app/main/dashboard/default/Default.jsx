import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Layout, Row, Col, List, Card, Collapse, Empty, Divider } from 'antd';
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import moment from "moment";

import "./default.scss";

const Default = () => {
    const { barangay } = useSelector((state) => state.user); 
    const dispatch = useDispatch();

    const [listData, setListData] = useState();
    const [eventList, setEventList] = useState([]);
    const [announcementList, setAnnouncementList] = useState([]);
    const [patientList, setPatientList] = useState([]);

    const fetchData = async () => {
        try {
            dispatch(changeLoader({ loading: true }));
            let userCreate = await axiosAPI.get(`dashboard/default?barangay=${barangay}`);
            setListData(userCreate.data.payload.table);
            setEventList(userCreate.data.payload.events);
            setAnnouncementList(userCreate.data.payload.announcements);
            setPatientList(userCreate.data.payload.records);
            dispatch(changeLoader({ loading: false }));
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 10px 0px 10px", borderRadius: "5px" }}>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 3,
                        xl: 3,
                        xxl: 3
                    }}
                    dataSource={listData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <Card style={{ minHeight: "175px", position: "relative", backgroundColor: index % 2 ? "#8C5C94" : "#AD72B7", borderRadius: "5px", overflow: "hidden" }}>
                                <p style={{ position: "absolute", fontSize: "18px", bottom: -10, left: 20, color: "white", fontWeight: 500 }}>{item.title}</p>
                                <p style={{ position: "absolute", top: 0, left: "40%", color: "white", fontWeight: 500, fontSize: "100px", zIndex: 10 }}>{item.count}</p>
                                <p style={{ position: "absolute", top: -12.5, left: "40%", color: index % 2 ? "#A76FB0" : "#D488E1", fontWeight: 500, fontSize: "120px" }}>{item.count}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px", marginTop: "15px", borderRadius: "5px" }}>
                <Row gutter={[24, 0]} >
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500 }}>Latest Events</Divider>
                        {
                            eventList.length !== 0 &&
                            <Collapse className="default-collapse">
                                {
                                    eventList.map((event, eKey) => {
                                        return (
                                            <Collapse.Panel header={event.event} style={{ backgroundColor: "#A76FB0" }} key={eKey}>
                                                <p><span style={{ fontWeight: 500 }}>Description:</span> {event.description}</p>
                                                <p><span style={{ fontWeight: 500 }}>Event Date/Time:</span> {moment(event.start_datetime).format("MMM DD,YYYY h:mm A")}</p>
                                            </Collapse.Panel>
                                        )
                                    })
                                }
                            </Collapse>
                        }
                        {
                            eventList.length === 0 &&
                            <Empty description="Currently no event listed."/>
                        }
                        <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500 }}>Latest Announcements</Divider>
                        {
                            announcementList.length !== 0 &&
                            <Collapse className="default-collapse">
                                {
                                    announcementList.map((event, eKey) => {
                                        return (
                                            <Collapse.Panel header={event.announcement} style={{ backgroundColor: "#A76FB0" }} key={eKey}>
                                                <p><span style={{ fontWeight: 500 }}>Message:</span> {event.message}</p>
                                                <p><span style={{ fontWeight: 500 }}>Announcement Date:</span> {moment(event.announcement_datetime).format("MMM DD,YYYY")}</p>
                                            </Collapse.Panel>
                                        )
                                    })
                                }
                            </Collapse>
                        }
                        {
                            announcementList.length === 0 &&
                            <Empty description="Currently no announcement listed."/>
                        }
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                        <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500 }}>Recent Patients</Divider>
                        {
                            patientList.length !== 0 &&
                            <List
                                itemLayout="horizontal"
                                dataSource={patientList}
                                renderItem={item => (
                                    <List.Item>
                                    <List.Item.Meta
                                        title={<p style={{ fontSize: "16px", fontWeight: 500 }}>{item.first_name} {item.last_name}</p>}
                                        description={item.detailed_report}
                                    />
                                    </List.Item>
                                )}
                            />
                        }
                        {
                            patientList.length === 0 &&
                            <Empty description="Currently no medical record listed."/>
                        }
                    </Col>
                </Row>
            </Layout.Content>
        </React.Fragment>
    );
}

export default Default;
