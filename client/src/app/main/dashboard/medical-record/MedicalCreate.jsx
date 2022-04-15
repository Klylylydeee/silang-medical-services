import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Button, Select, Form, Row, Col, Input, DatePicker, Divider, Slider, Alert, Tooltip, AutoComplete, Modal, Descriptions } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { Helmet } from "react-helmet-async";
import moment from "moment";

const MedicalCreate = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { designation, barangay, first_name, last_name } = useSelector((state) => state.user); 
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const history = useNavigate();

    const [prescriptionList, setPrescriptionList] = useState([]);
    const [autoComplete, setAutoComplete] = useState([]);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState({});

    const onReset = () => {
        form.resetFields();
        setPrescriptionList([]);
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

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
            const postFormData = await axiosAPI.post(`medical-record/private/create`, formData)
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
        const getAutoCompleteFields = async () => {
            try {
                dispatch(changeLoader({ loading: true }))
                const postFormData = await axiosAPI.get(`medical-record/auto-complete?barangay=${barangay}`)
                setAutoComplete(postFormData.data.payload)
                dispatch(changeLoader({ loading: false }));
            } catch (err) {
                dispatch(changeLoader({ loading: false }))
                toasterRequest({ payloadType: "error", textString: "Auto complete currently not available"})
            }
        }
        getAutoCompleteFields();
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
                    onFinish={(data) => {
                        setModalStatus(true)
                        setModalData(data)
                    }}
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
                                    {
                                        min: 3,
                                        message: "Min length of 3 characters"
                                    }
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
                                    {
                                        min: 3,
                                        message: "Min length of 3 characters"
                                    }
                                ]}
                                required={true}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 12 }} >
                            <Form.Item
                                name="gender"
                                label="Gender"
                                tooltip="Basis of user's sexual identity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill out this field!",
                                    },
                                ]}
                                required={true}
                            >
                                <Select>
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Others">Others</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="date_of_birth"
                                label="Date of Birth"
                                tooltip="Citizen's birth date"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill out this field!",
                                    },
                                ]}
                                required={true}
                            >
                                <DatePicker disabledDate={disabledDate} format="YYYY-MM-DD" style={{ width: "100%" }} />
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
                                tooltip="Basis on which barangay the user is living"
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
                        <Col xs={{ span: 24 }} >
                            <Form.Item
                                name="address"
                                label="Complete Address"
                                tooltip="Basis where the user is living"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill out this field!",
                                    },
                                    {
                                        min: 5,
                                        message: "Min length of 5 characters"
                                    }
                                ]}
                                required={true}
                            >
                                <Input />
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
                                        tooltip="Individual's possible diagnosis"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                            {
                                                min: 3,
                                                message: "Min length of 3 characters"
                                            }
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
                                        tooltip="Diagnosis severity score"
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
                                        tooltip="Written representation of the diagnosis"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please fill out this field!",
                                            },
                                            {
                                                min: 10,
                                                message: "Min length of 10 characters"
                                            }
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
                                                    tooltip="Prescription Listing"
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
                                tooltip="Creator's given birth first name"
                                required={true}
                                initialValue={`${first_name} ${last_name} (${designation})`}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="approvedBy"
                                label="Record Approver"
                                tooltip="Approver's given birth first name"
                                required={true}
                                initialValue={designation === "Doctor" ? `${first_name} ${last_name} (${designation})` : ``}
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
            <Modal 
                title="Medical Record Confirmation" 
                visible={modalStatus}
                onOk={() => {
                    submitForm(modalData)
                }} onCancel={() => {
                    setModalStatus(false)
                }}
            >
                <Descriptions bordered>
                    <Descriptions.Item label="Name" span={3}>{modalData.first_name} {modalData.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{modalData.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number" span={3}>{modalData.prefix}{modalData.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>{modalData.address}</Descriptions.Item>
                </Descriptions>
            </Modal>
        </React.Fragment>
    );
};

export default MedicalCreate;
