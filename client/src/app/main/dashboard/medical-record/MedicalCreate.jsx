import React from "react";
import { useSelector } from "react-redux";

//Ant Design layout
import {
    Col,
    Row,
    Layout,
    Form,
    InputNumber,
    Input,
    Button,
    Select,
    PageHeader,
    Divider,
    Space,
    Modal
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//Scss Styling
import '../../../../styles/medical-create.scss'

const { confirm } = Modal;

const MedicalCreate = () => {
    const [form] = Form.useForm();
    const { dimension } = useSelector((state) => state.web);

    function showConfirm() {
        confirm({
            title: 'Do you want you add this record in the table?',
            icon: <ExclamationCircleOutlined />,
            content: 'Confirming this will create a record for this patient.',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // modal content configs
    // specifically for phone number 
    const { Option } = Select;
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="63">+63</Option>
            </Select>
        </Form.Item>
    );

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Layout.Content>
            <div style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Medical Record"
                    subTitle={dimension >= 4 ? "Please fill-up everything before submitting." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7", borderRadius: "5px" }}
                />
            </div>
            <div style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Divider orientation="left" plain orientationMargin={10}>
                        Patient Details
                    </Divider>
                    <Row gutter={[24, 0]} style={{ paddingTop: "5px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            {/*Patient Name*/}
                            <Form.Item
                                label="Patient Name"
                                name="patient name"
                                rules={[{ required: true, message: 'Please input patient name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/*Phone Number of Patient*/}
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            {/*Patient Diagnosis*/}
                            <Form.Item
                                label="Patient Diagnosis"
                                name="patient diagnosis"
                                rules={[{ required: true, message: 'Please input patient diagnosis!' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/*Email of the Patient*/}
                            <Form.Item
                                label="Email Address"
                                name="email address"
                                rules={[{ required: true, message: 'Please input patient email address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>


                    {/*Diagnosis Report*/}
                    <Form.Item
                        label="Diagnosis Report"
                        name="diagnosis report"
                        rules={[{ required: true, message: 'Please input patient diagnosis report!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    {/*Severity of Patient*/}
                    <Form.Item
                        label="Severity"
                        rules={[{ required: true, message: 'Please input patient severity!' }]}
                    >
                        <Select placeholder="Select the level of severity">
                            <Option value="Normal">Normal</Option>
                            <Option value="Moderate">Moderate</Option>
                            <Option value="Severe">Severe</Option>
                        </Select>
                    </Form.Item>

                    <Divider orientation="left" plain orientationMargin={10}>
                        Prescription for the Patient
                    </Divider>

                    {/*Prescription for Patient*/}
                    <Form.Item label="Prescription">
                        <Input.Group compact>

                            {/*Selection of Medication*/}
                            <Form.Item
                                name={['Medication']}
                                noStyle
                                rules={[{ required: true, message: 'Please input medication' }]}
                            >
                                <Select placeholder="Select medication">
                                    <Option value="Biogesic">Biogesic</Option>
                                    <Option value="Bioflu">Bioflu</Option>
                                </Select>
                            </Form.Item>


                            {/*Selected Medication Intake*/}
                            <Form.Item
                                name={['Medication Intake']}
                                noStyle
                                rules={[{ required: true, message: 'Please input medication intake' }]}
                            >
                                <Input style={{ width: '50%' }} placeholder="Medication Intake" />
                            </Form.Item>
                        </Input.Group>

                        <Input.Group compact>
                            {/*Description for the Medicine*/}
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <Input.TextArea style={{ width: '35vw' }} />
                            </Form.Item>

                            {/*Quantity of the medication*/}
                            <Form.Item
                                label="Quantity"
                                rules={[{ required: true, message: 'Please input quantity of medication' }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    {/*Staff Medical ID*/}
                    <Form.Item
                        label="Medical Staff ID"
                        tooltip="Your Medical Staff ID"
                        rules={[{ required: true, message: 'Please input your medical ID' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    {/*Submit and Reset buttons*/}
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }} onClick={() => onReset()}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={showConfirm}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </Layout.Content>
    )
};

export default MedicalCreate;
