import React from "react";
import { useParams } from "react-router-dom";

import { Col, Row, Layout, Avatar, Divider, List, Descriptions, Card, Typography } from 'antd';
import { UserOutlined, ContactsOutlined, MedicineBoxOutlined } from '@ant-design/icons';

import '../../../../styles/medical-data.scss'

const data = [
    'Biogesic',
    'Bioflu',
    'Alaksan FR',
    'Viagra',
    'Neosep',
    'Amoxicilin'
];

const date = "January 1, 2021"
const status = "Waiting for Doctor's Approval"
const createdBy = "Rondel Hallare"
const approvedBy = "Dr. Klyde Guevarra"
const { Title } = Typography;

const MedicalData = () => {

    const params = useParams();
    const PatientDiagnosis = "Allergy"


    return (
        <Layout.Content>
            <Col className="data-container" xs={{ span: 24 }} sm={{ span: 17 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                <div className="header">
                    <h1>PATIENT OVERVIEW</h1>
                </div>

                <div className="child-container">
                    <Row gutter={[24, 32]}>
                        <Col>
                            <div className="patient-name">
                                <div className="avatar">
                                    <Avatar size={100} icon={<UserOutlined />} />
                                </div>
                                <h2>{params.id}</h2>
                            </div>

                            <div className="contact-details">
                                <Divider orientation="left"><ContactsOutlined /> Patient Details</Divider>
                                <Descriptions className="contact-descriptions" style={{ padding: 15 }} layout="vertical" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                                    <Descriptions.Item className="desc-item" label="Phone Number"><p>+639 1832 9698</p></Descriptions.Item>
                                    <Descriptions.Item className="desc-item" label="Email Address"><p>jetherhaniel@yahoo.com</p></Descriptions.Item>
                                    <Descriptions.Item className="desc-item" label="Patient Diagnosis"><p>{PatientDiagnosis}</p></Descriptions.Item>
                                    <Descriptions.Item className="desc-item" label="Severity"><p>Moderate</p></Descriptions.Item>
                                </Descriptions>
                            </div>
                        </Col>

                        <Col>
                            <div className="medication-details">
                                <Divider orientation="left"><MedicineBoxOutlined /> Medications</Divider>
                                <List
                                    size="large"
                                    dataSource={data}
                                    renderItem={item => <List.Item>{item}</List.Item>} />
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={[16, 32]}>
                        <Col>
                            <div>
                                <Card title={<Title level={3}>Diagnosis Report</Title>} className="diagnosis-report" style={{ marginTop: 20 }}>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies purus dictum lorem aliquam, eget vehicula eros porta. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                                    <p>Maecenas finibus massa ut nibh efficitur faucibus. Phasellus in sem quis ipsum mattis consequat. Pellentesque accumsan sem eu neque congue, a dignissim erat rhoncus</p>
                                    <p>Etiam nec vestibulum risus. Suspendisse efficitur est mi, ut efficitur elit condimentum at. Vivamus quis mattis dui. Ut placerat sem enim, eu tempor metus semper at.</p>
                                </Card>
                            </div>
                        </Col>

                        <Col>
                            <div>
                                <Card title={<Title level={5}>Date Created</Title>} className="medical-cards" style={{ marginTop: 20 }}>
                                    <p>{date}</p>
                                </Card>
                            </div>

                            <div>
                                <Card title={<Title level={5}>Created By</Title>} className="medical-cards" style={{ marginTop: 20 }}>
                                    <p>{createdBy}</p>
                                </Card>
                            </div>
                        </Col>

                        <Col>
                            <div>
                                <Card title={<Title level={5}>Record Status</Title>} className="medical-cards" style={{ marginTop: 20 }}>
                                    <p>{status}</p>
                                </Card>

                                <div>
                                    <Card title={<Title level={5}>Approved By</Title>} className="medical-cards" style={{ marginTop: 20 }}>
                                        <p>{approvedBy}</p>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </Col>
        </Layout.Content>
    )
};

export default MedicalData;
