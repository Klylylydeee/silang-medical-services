import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, PageHeader, Row, Col, Divider, List, Avatar, Card, Typography } from "antd"
import { UserOutlined, ContactsOutlined, MedicineBoxOutlined,  } from '@ant-design/icons';
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const MedicalData = () => {
    const { dimension } = useSelector((state) => state.web); 
    const params = useParams();
    const dispatch = useDispatch();
    const [presciptionList, setPresciptionList] = useState([]);
    const [medData, setMedData] = useState({
        full_name: "",
        barangay: "",
        phone_number: "",
        email: "",
        diagnosis: "",
        outlier: "",
        detailed_report: "",
        createdBy: "",
        approvedBy: "",
        createdAt: "",
        updatedAt: "",
        pin: ""
    });

    useEffect(() => {
        const getMedicalData = async () => {
            try {
                dispatch(changeLoader({ loading: true }))
                const medicalData = await axiosAPI.get(`medical-record/private/medical-record?id=${params.id}`);
                setMedData({
                    full_name: medicalData.data.payload.first_name + " " + medicalData.data.payload.last_name,
                    barangay: medicalData.data.payload.barangay,
                    phone_number: medicalData.data.payload.phone_number,
                    email: medicalData.data.payload.email,
                    diagnosis: medicalData.data.payload.diagnosis,
                    outlier: medicalData.data.payload.outlier,
                    status: medicalData.data.payload.status,
                    detailed_report: medicalData.data.payload.detailed_report,
                    createdBy: medicalData.data.payload.createdBy,
                    approvedBy: medicalData.data.payload.approvedBy,
                    createdAt: medicalData.data.payload.createdAt,
                    updatedAt: medicalData.data.payload.updatedAt,
                    pin: medicalData.data.payload.pin
                })
                setPresciptionList(medicalData.data.payload.prescription.map((data) => {
                    return data.prescription !== undefined || data.presciption !== null ?
                        `${data.prescription} - ${data.dosage}`
                    :
                        undefined
                }))
                dispatch(changeLoader({ loading: false }));
            } catch (err) {
                dispatch(changeLoader({ loading: false }))
                err.response ? 
                    toasterRequest({ payloadType: "error", textString: err.response.data.message})
                :
                    toasterRequest({ payloadType: "error", textString: err.message});
            }
        }
        getMedicalData()
        // eslint-disable-next-line
    }, []);
    return (
        <React.Fragment>
            <Helmet>
                <title>Medical Record | Portal Silang Medical Services</title>
            </Helmet>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title={`Medical Record ${params.id}`} 
                    subTitle={dimension >= 4 ? "Record Data is listed below." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                    <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px", display: "flex", alignItems: "center" }}>
                        <Avatar size={75} icon={<UserOutlined />} style={{ marginRight: "15px" }} />
                        <div>
                            <p style={{ fontSize: "18px", fontWeight: 500 }}>{medData.full_name}</p>
                            <p style={{ lineHeight: 0 }}>{medData.barangay}</p>
                        </div>
                    </Layout.Content>
                    <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                        <Divider orientation="left"><ContactsOutlined /> Patient Details</Divider>
                        <Row gutter={[24, 24]} style={{ paddingTop: "10px" }}>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <p style={{ fontWeight: 500 }}>Phone Number:</p>
                                <p style={{ lineHeight: 0 }}>{medData.phone_number}</p>
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <p style={{ fontWeight: 500 }}>Email Address:</p>
                                <p style={{ lineHeight: 0 }}>{medData.email}</p>
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <p style={{ fontWeight: 500 }}>Diagnosis:</p>
                                <p style={{ lineHeight: 0 }}>{medData.diagnosis}</p>
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <p style={{ fontWeight: 500 }}>Severity:</p>
                                <p style={{ lineHeight: 0 }}>{medData.outlier >= 8 ? "Severe" : medData.outlier >= 5 ? "Moderate" : "Mild"}</p>
                            </Col>
                        </Row>
                    </Layout.Content>
                    <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Record Status</Typography.Title>}>
                        {
                        medData.status === true ?
                            "Medical Record has been reviewed."
                        :
                            "Awaiting for review."
                        }
                    </Card>
                    <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Diagnosis Report</Typography.Title>} style={{ marginTop: 20 }}>
                        {medData.detailed_report}
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                    <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                        <Divider orientation="left"><MedicineBoxOutlined /> Medications</Divider>
                        <List
                            size="large"
                            dataSource={presciptionList}
                            renderItem={
                                item => <List.Item>{item}</List.Item>
                            } 
                        />
                    </Layout.Content>
                    <Row gutter={[24, 24]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Created By</Typography.Title>}>
                                {medData.createdBy}
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Approved By</Typography.Title>}>
                                {medData.approvedBy === "" ? "Awaiting for review." : medData.approvedBy}
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Creation Date</Typography.Title>}>
                                {
                                    medData.createdAt !== "" ?
                                        moment(medData.createdAt).format("MMMM DD, YYYY h:mm A")
                                    :
                                        moment().format()
                                }
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Last Accessed</Typography.Title>}>
                                {
                                    medData.updatedAt !== "" ?
                                        moment(medData.updatedAt).format("MMMM DD, YYYY h:mm A")
                                    :
                                        moment().format()
                                }
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }}>
                            <Card title={<Typography.Title level={3} style={{ fontSize: "16px" }}>Identification PIN</Typography.Title>}>
                                {medData.pin}
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MedicalData;
