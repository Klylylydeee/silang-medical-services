import React, { useState, useEffect } from 'react'
import jwt from "jsonwebtoken"
import { useSearchParams, useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { useSelector, useDispatch } from "react-redux";
import Header from "./record-header.png";
import { Avatar, Image, Divider, Empty, Row, Col, Card, Tooltip, Space, Drawer, Layout, Typography, List} from 'antd';
import { EllipsisOutlined, UserOutlined  } from '@ant-design/icons';
import Navigation from "../../../test/landing/TestNav";
import Lumil from "../img/barangay-lumil.png"
import Grid from "../img/black-grid.png"
import PK from "../img/barangay-putingkahoy.png"
import Footer from "./footer.png"
import moment from "moment";
import { Helmet } from "react-helmet-async";

const MedicalRecord = () => {
    const { dimension } = useSelector((state) => state.web);
    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [record, setRecord] = useState({
        email: "",
        barangay: ""
    })
    const [dataList, setDataList] = useState([]);
    const [newHeight, setHeight] = useState("");
    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [drawerData, setDrawerData] = useState({});
    useEffect(() => {
            const heightDiv = document.getElementById("test")
            const offset = heightDiv.offsetHeight;
            // eslint-disable-next-line
            const padding = window.getComputedStyle(heightDiv).getPropertyValue("padding-top")
            // eslint-disable-next-line
            const paddingB = window.getComputedStyle(heightDiv).getPropertyValue("padding-bottom")
            const newHeight = offset
            setHeight(`${newHeight}px`)
    // eslint-disable-next-line
    }, [dimension])
    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(changeLoader({ loading: true }))
                let decodedData = jwt.verify(params.get("auth"), process.env.REACT_APP_JWT_BACKEND);
                if(decodedData.barangay !== "Lumil" && decodedData.barangay !== "Puting Kahoy"){
                    throw new Error("Authentication incorrect!")
                }
                const payloadData = await axiosAPI.post(`medical-record/public/generate-record-list`, {
                    email: decodedData.email,
                    barangay: decodedData.barangay, 
                    phone_number: decodedData.phone_number
                })
                setDataList(payloadData.data.payload.map((data) => {
                    return {
                        ...data,
                        createdAt: moment(data.createdAt).format("MMMM DD,YYYY")
                    }
                }))
                setRecord(decodedData)
                dispatch(changeLoader({ loading: false }))
                setTimeout(()=>{
                    const heightDiv = document.getElementById("test")
                    const offset = heightDiv.offsetHeight;
                    // eslint-disable-next-line
                    const padding = window.getComputedStyle(heightDiv).getPropertyValue("padding-top")
                    // eslint-disable-next-line
                    const paddingB = window.getComputedStyle(heightDiv).getPropertyValue("padding-bottom")
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
            <Helmet>
                <title>Medical Record | Silang Medical Services</title>
                <meta name="description" content="Contains a personal record for a particular citizen of a specific barangay."/>
                <meta name="robots" content="noindex"/>
                <link rel="canonical" href="/medical-record"/>
            </Helmet>
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: dimension >= 4 ? "row" : "column"
                    }}
                >
                    <Avatar src={<Image src={record.barangay === "Lumil" ? Lumil : PK}/>} size={dimension >= 4 ? 175 : 150} style={{ margin: dimension >= 4 ? "0px" : "75px 0 15px 0" }} shape="circle" />
                    <div style={{ padding: dimension >= 4 ? "0 0 0 75px" : "0 0 75px 0", margin: 0, color: "white", fontSize: "42px", fontWeight: 500 }}>
                        <p>
                            Barangay {record.barangay}
                        </p>
                        <p style={{ lineHeight: "30px", padding: 0, margin: 0, fontSize: "18px", fontWeight: 400, textAlign: dimension >= 4 ? "center" : ""  }}>
                            Medical Records relating to {record.email}
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
                            Terms and Conditions. The following documents are private and confidential evidence and resource in respect of the barangay officials and personnels which are enclosed and should not be publicly shared to other resources.
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
                        <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500, padding: "20px 0"}}>Search Results</Divider>
                        {
                            dataList.length === 0 &&
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
                                dataList.length !== 0 &&
                                dataList.map((recordRow) => {
                                    return (
                                        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                                            <Card
                                                actions={[
                                                    <Space style={{ cursor: "auto" }}>
                                                        {recordRow.createdAt}
                                                    </Space>,
                                                    <Tooltip title="View Medical Record" >
                                                        <EllipsisOutlined key="ellipsis" onClick={() => {
                                                            setDrawerVisibility(true)
                                                            setDrawerData(recordRow)
                                                        }}/>
                                                    </Tooltip>,
                                                ]}
                                            >
                                                <Card.Meta
                                                    title={recordRow.diagnosis}
                                                    description={recordRow.detailed_report}
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
                title={`Medical Record ${drawerData._id}`}
                width={dimension >= 4 ? 500 : "100%"}
                closable={true}
                onClose={() => {
                    setDrawerVisibility(false)
                }}
                visible={drawerVisibility}
            >
                <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px", display: "flex", alignItems: "center" }}>
                    <Avatar size={75} icon={<UserOutlined />} style={{ marginRight: "15px" }} />
                    <div>
                        <p style={{ fontSize: "18px", fontWeight: 500 }}>{drawerData.first_name} {drawerData.last_name}</p>
                        <p style={{ lineHeight: 0 }}>{drawerData.barangay}</p>
                    </div>
                </Layout.Content>
                <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Patient Details</Typography.Title>}>
                    <Row gutter={[24, 24]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <p style={{ fontWeight: 500 }}>Phone Number:</p>
                            <p style={{ lineHeight: 0 }}>{drawerData.phone_number}</p>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <p style={{ fontWeight: 500 }}>Email Address:</p>
                            <p style={{ lineHeight: 0 }}>{drawerData.email}</p>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <p style={{ fontWeight: 500 }}>Diagnosis:</p>
                            <p style={{ lineHeight: 0 }}>{drawerData.diagnosis}</p>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <p style={{ fontWeight: 500 }}>Severity:</p>
                            <p style={{ lineHeight: 0 }}>{drawerData.outlier >= 8 ? "Severe" : drawerData.outlier >= 5 ? "Moderate" : "Mild"}</p>
                        </Col>
                    </Row>
                </Card>
                <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Record Status</Typography.Title>} style={{ marginTop: 20 }}>
                    {
                        drawerData.status === true ?
                        "Medical Record has been reviewed."
                    :
                        "Awaiting for review."
                    }
                </Card>
                <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Diagnosis Report</Typography.Title>} style={{ marginTop: 20 }}>
                    {drawerData.detailed_report}
                </Card>
                <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Medications</Typography.Title>} style={{ marginTop: 20 }}>
                    <List
                        size="large"
                        dataSource={drawerData.prescription}
                        renderItem={
                            item => <List.Item>{`${item.prescription} - ${item.dosage}`}</List.Item>
                        } 
                    />
                </Card>
            </Drawer>
        </React.Fragment>
    );
}

export default MedicalRecord
