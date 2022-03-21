import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, Divider, Slider, Alert, Tooltip, AutoComplete } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { Helmet } from "react-helmet-async";

const MedicalUpdate = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { designation, barangay } = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const params = useParams();

    const [form] = Form.useForm();

    const history = useNavigate();

    const [prescriptionList, setPrescriptionList] = useState([]);
    const [autoComplete, setAutoComplete] = useState([]);

    const onReset = () => {
        form.resetFields();
        setPrescriptionList([]);
    };

    const submitForm = async ({ prefix, phone_number, ...formData }) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let checkPrescription = prescriptionList.filter((recordData) => {
                return recordData.dosage === "" || recordData.prescription === "" ? true : false
            })
            if(checkPrescription.length !== 0){
                let error = new Error("Please complete the prescription details!");
                error.statusCode = 501;
                throw error;
            };
            formData.prescription = prescriptionList;
            formData.status = designation === "Doctor" ? true : false
            formData.phone_number = prefix + phone_number
            const postFormData = await axiosAPI.patch(`medical-record/private/update-record`, {
                ...formData,
                id: params.id
            })
            dispatch(changeLoader({ loading: false }));
            toasterRequest({ payloadType: "success", textString: postFormData.data.message});
            history({
                pathname: `/dashboard/medical-records/view/${postFormData.data.payload._id}`
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
        const getDataForm = async () => {
            try {
                dispatch(changeLoader({ loading: true }))
                const postFormData = await axiosAPI.get(`medical-record/private/medical-record?id=${params.id}`);
                const autCompleteForm = await axiosAPI.get(`medical-record/auto-complete?barangay=${barangay}`)
                form.setFieldsValue({
                    first_name: postFormData.data.payload.first_name,
                    last_name: postFormData.data.payload.last_name,
                    email: postFormData.data.payload.email,
                    phone_number: postFormData.data.payload.phone_number.substring(3),
                    barangay: postFormData.data.payload.barangay,
                    diagnosis: postFormData.data.payload.diagnosis,
                    outlier: postFormData.data.payload.outlier,
                    detailed_report: postFormData.data.payload.detailed_report,
                    createdBy: postFormData.data.payload.createdBy,
                    approvedBy: postFormData.data.payload.approvedBy
                });
                setAutoComplete(autCompleteForm.data.payload)
                setPrescriptionList(postFormData.data.payload.prescription);
                dispatch(changeLoader({ loading: false }));
            } catch (err) {
                dispatch(changeLoader({ loading: false }))
                err.response ? 
                    toasterRequest({ payloadType: "error", textString: err.response.data.message})
                :
                    toasterRequest({ payloadType: "error", textString: err.message});
            }
        }
        getDataForm();
    // eslint-disable-next-line
    }, [])
    
    return (
        <React.Fragment>
            <Helmet>
                <title>Medical Record | Portal Silang Medical Services</title>
            </Helmet>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Create Medical Record" 
                    subTitle={dimension >= 4 ? "Please fill-up everything before submitting." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Layout.Content style={{ marginBottom: "15px", borderRadius: "5px" }}>
                <Alert message="By default, the current user is set as the requestor. If the current user is not the requestor please select the switch." type="info" closeText="Close Now" />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Form
                    onFinish={submitForm}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }}>
                            <Divider orientation="left" plain orientationMargin={10}>
                                Patient Details
                            </Divider>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                                required={true}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                
                        <Col xs={{ span: 24 }} >
                            <Form.Item
                                name="barangay"
                                label="Barangay"
                                tooltip="Basis whether the event is approved or not"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill out this field!",
                                    },
                                ]}
                                required={true}
                                initialValue={barangay}
                            >
                            <Select disabled={designation !== "Doctor" ? true : false}>
                                    <Select.Option value="Lumil">Lumil</Select.Option>
                                    <Select.Option value="Puting Kahoy">Puting Kahoy</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                                <Col xs={{ span: 24 }}>
                                    <Divider orientation="left" plain orientationMargin={10}>
                                        Diagnosis Details
                                    </Divider>
                                </Col>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="diagnosis"
                                        label="Diagnosis"
                                        tooltip="Individual's personal/private email address"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        {/* <Input /> */}
                                        <AutoComplete
                                            style={{
                                                width: "100%",
                                            }}
                                            options={autoComplete}
                                            filterOption={
                                                (inputValue, option) => {
                                                    return  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="outlier"
                                        label="Severity"
                                        tooltip="Individual's personal/private email address"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Slider marks={{
                                            1: {
                                                style: {
                                                    color: '#abde95',
                                                },
                                                label: <strong>Mild</strong>,
                                            },
                                            5: {
                                                style: {
                                                    color: '#ffc04c',
                                                },
                                                label: <strong>Moderate</strong>,
                                            },
                                            8: {
                                                style: {
                                                    color: '#fb6666',
                                                },
                                                label: <strong>Severe</strong>,
                                            }
                                        }} max={10} min={1}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} >
                                    <Form.Item
                                        name="detailed_report"
                                        label="Detailed Report"
                                        tooltip="Written representation of the event"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                        ]}
                                        required={true}
                                    >
                                        <Input.TextArea autoSize={{ minRows: 10, maxRows: 6 }}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Row gutter={[24, 0]} style={{ paddingTop: "10px", position: "relative"}} wrap={false}>
                                <Col flex="auto">
                                    <Divider orientation="left" plain orientationMargin={10}>
                                        {dimension === 1 || dimension === 0 ? "Prescription" : "Prescription Details"}
                                    </Divider>
                                </Col>
                                <Col flex={dimension === 1 || dimension === 0 ? "85px" : "165px"}>
                                    <Button 
                                        type="primary"
                                        onClick={()=> { setPrescriptionList((prevData) => { return [
                                            ...prevData,
                                            {
                                                prescription: "",
                                                dosage: ""
                                            }
                                        ]}) }}
                                        style={{ position: "absolute", top: 0, bottom: 0, margin: "auto 0"}}
                                    >
                                        {dimension === 1 || dimension === 0 ? "Add" : "Add Prescription"}
                                    </Button>
                                </Col>
                            </Row>
                            {
                                prescriptionList.map((data, key) => {
                                    return (
                                        <Row gutter={[24, 0]} style={{ paddingTop: "10px", position: "relative"}} wrap={false} key={key}>
                                            <Col xs={{ span: 24 }} >
                                                <Form.Item
                                                    name="detailed_report"
                                                    label={`Prescription ${key+1}`}
                                                    tooltip="Written representation of the event"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please fill out this field!",
                                                        },
                                                    ]}
                                                    required={true}
                                                >
                                                    <Input.Group compact>
                                                        <Input style={{ width: '70%' }} placeholder="Prescription" value={data.prescription} 
                                                            onChange={
                                                                (value) => {
                                                                    setPrescriptionList((prevData) => {
                                                                        prevData[key] = {
                                                                            ...prevData[key],
                                                                            prescription: value.target.value
                                                                        }
                                                                        return [
                                                                            ...prevData
                                                                        ]
                                                                    })
                                                                }
                                                            }
                                                        />
                                                        <Input style={{ width: '20%' }} placeholder="Dose/Amount" value={data.dosage}
                                                            onChange={
                                                                (value) => {
                                                                    setPrescriptionList((prevData) => {
                                                                        prevData[key] = {
                                                                            ...prevData[key],
                                                                            dosage: value.target.value
                                                                        }
                                                                        return [
                                                                            ...prevData
                                                                        ]
                                                                    })
                                                                }
                                                            }
                                                        />
                                                        <Tooltip title="Remove prescription" >
                                                            <Button 
                                                                onClick={
                                                                    ()=>{ 
                                                                        setPrescriptionList((data) => {
                                                                            data.splice(key, 1)
                                                                            return [
                                                                                ...data
                                                                            ]
                                                                        })
                                                                    }
                                                                }
                                                                style={{ width: '10%', backgroundColor: "#fb6666", color: "white" }}
                                                            >
                                                                X
                                                            </Button>
                                                        </Tooltip>
                                                    </Input.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    
                    <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
                        <Col xs={{ span: 24 }}>
                            <Divider orientation="left" plain orientationMargin={10}>
                                Record Details
                            </Divider>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="createdBy"
                                label="Record Creator"
                                tooltip="Individual's given birth first name"
                                required={true}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="approvedBy"
                                label="Record Approver"
                                tooltip="Individual's given birth first name"
                                required={true}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ paddingTop: "20px" }}>
                        <Button type="default" style={{ marginRight: dimension <= 4 ? "10px" : "20px" }}  onClick={() => onReset() }>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Layout.Content>
        </React.Fragment>
    );
};

export default MedicalUpdate;
