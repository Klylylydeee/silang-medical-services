import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { PageHeader, Layout, Row, Col, Menu, Empty, Pagination, Card, Button, Descriptions, Space, Tooltip } from "antd";
import { DisconnectOutlined } from "@ant-design/icons";
import { Table } from "ant-table-extensions";
import { MailOutlined } from "@ant-design/icons";
import "./communication.scss";

const Communication = () => {
    const { dimension } = useSelector((state) => state.web);
    const { barangay } = useSelector((state) => state.user);
    const [paginationNum, setPaginationNum] = useState(1);
    // eslint-disable-next-line
    const [commData, setCommData] = useState([
        {
            "title": "1!",
            "_id": "123456789"
        },
        {
            "title": "2!",
            "_id": "123456789"
        },
        {
            "title": "3!",
            "_id": "123456789"
        },
        {
            "title": "4!",
            "_id": "123456789"
        },
        {
            "title": "5!",
            "_id": "123456789"
        },
        {
            "title": "6!",
            "_id": "123456789"
        },
        {
            "title": "7!",
            "_id": "123456789"
        },
        {
            "title": "8!",
            "_id": "123456789"
        },
        {
            "title": "9!",
            "_id": "123456789"
        },
        {
            "title": "10!",
            "_id": "123456789"
        },
        {
            "title": "11!",
            "_id": "123456789"
        },
        {
            "title": "12!",
            "_id": "123456789"
        },
        {
            "title": "13!",
            "_id": "123456789"
        },
        {
            "title": "14!",
            "_id": "123456789"
        },
        {
            "title": "15!",
            "_id": "123456789"
        },
        {
            "title": "16!",
            "_id": "123456789"
        },
        {
            "title": "17!",
            "_id": "123456789"
        },
        {
            "title": "18!",
            "_id": "123456789"
        },
        {
            "title": "19!",
            "_id": "123456789"
        },
        {
            "title": "20!",
            "_id": "123456789"
        },
        {
            "title": "1!",
            "_id": "123456789"
        },
        {
            "title": "2!",
            "_id": "123456789"
        },
        {
            "title": "3!",
            "_id": "123456789"
        },
        {
            "title": "4!",
            "_id": "123456789"
        },
        {
            "title": "5!",
            "_id": "123456789"
        },
        {
            "title": "6!",
            "_id": "123456789"
        },
        {
            "title": "7!",
            "_id": "123456789"
        },
        {
            "title": "8!",
            "_id": "123456789"
        },
        {
            "title": "9!",
            "_id": "123456789"
        },
        {
            "title": "10!",
            "_id": "123456789"
        },
        {
            "title": "11!",
            "_id": "123456789"
        },
        {
            "title": "12!",
            "_id": "123456789"
        },
        {
            "title": "13!",
            "_id": "123456789"
        },
        {
            "title": "14!",
            "_id": "123456789"
        },
        {
            "title": "15!",
            "_id": "123456789"
        },
        {
            "title": "16!",
            "_id": "123456789"
        },
        {
            "title": "17!",
            "_id": "123456789"
        },
        {
            "title": "18!",
            "_id": "123456789"
        },
        {
            "title": "19!",
            "_id": "123456789"
        },
        {
            "title": "20!",
            "_id": "123456789"
        },
        {
            "title": "1!",
            "_id": "123456789"
        },
        {
            "title": "2!",
            "_id": "123456789"
        },
        {
            "title": "3!",
            "_id": "123456789"
        },
        {
            "title": "4!",
            "_id": "123456789"
        },
        {
            "title": "5!",
            "_id": "123456789"
        },
        {
            "title": "6!",
            "_id": "123456789"
        },
        {
            "title": "7!",
            "_id": "123456789"
        },
        {
            "title": "8!",
            "_id": "123456789"
        },
        {
            "title": "9!",
            "_id": "123456789"
        },
        {
            "title": "10!",
            "_id": "123456789"
        }
    ]);
    const [selectedComm, setSelectedComm] = useState({
        title: "",
        _id: ""
    });
    // eslint-disable-next-line
    const [ data, setData ] = useState([]);
    const titleRef = useRef();

    
                
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
                         }}>
                            <DisconnectOutlined />
                        </Button>
                    </Tooltip>
                </Space>
            ),
        }
    ];

    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Communication" 
                    subTitle={dimension >= 4 ? `Announcements and other message by the Barnagay ${barangay} Officials.` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button key="3" onClick={() => {
                            // history({
                            //     pathname: `/dashboard/users/create/invitation`
                            // })
                        }} style={{ color: "#AD72B7" }}>Create Announcement</Button>
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Row>
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
                                        return <Menu.Item key={commIndex} onClick={() => { setSelectedComm(data) }}>{data.title}</Menu.Item>
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
                            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                                <Empty/>
                            </div>
                        }
                        {
                            selectedComm._id === "" && commData.length > 0 &&
                            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                                <Empty description={
                                    <span>
                                        Select an announcement!
                                    </span>
                                }/>
                            </div>
                        }
                        {
                            selectedComm._id !== "" &&
                            <Card title={selectedComm.title} extra={
                                <Button key="3" onClick={() => {
                                    // history({
                                    //     pathname: `/dashboard/users/create/invitation`
                                    // })
                                }} style={{ color: "#AD72B7" }}>Update Announcement</Button>
                            } style={{ width: "100%", height: "100%", marginTop: dimension >= 4 ? "0" : "30px"}}>
                                <Descriptions title="Announcement Details" ayout="vertical" bordered>
                                    <Descriptions.Item label="Message" span={3}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, cupiditate?
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date Creation" span={1.5}>
                                        March 03, 2022 - 1:05 PM
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Announcement Date" span={1.5}>
                                        March 03, 2022 - 1:05 PM
                                    </Descriptions.Item>
                                </Descriptions>
                                <Descriptions title="Announcer Information" layout="vertical" bordered style={{ marginTop: "20px" }}>
                                    <Descriptions.Item label="First Name" span={2}>
                                        Tester
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Last Name" span={2}>
                                        Tester
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Email" span={2}>
                                        Tester
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Phone Number" span={2}>
                                        Tester
                                    </Descriptions.Item>
                                </Descriptions>
                                <p style={{ fontSize: "16px", fontWeight: 700, paddingTop: "20px"}}>Subscribed Citizen</p>
                                <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
                            </Card>
                        }
                    </Col>
                </Row>
            </Layout.Content>
        </React.Fragment>
    );
};

export default Communication;
