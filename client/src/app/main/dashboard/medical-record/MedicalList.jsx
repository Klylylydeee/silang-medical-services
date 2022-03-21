import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "ant-table-extensions";
//Ant Design layout
import {
    Layout,
    Tag,
    Space,
    PageHeader,
    Button,
    Tooltip
} from 'antd';
import { MedicineBoxOutlined, FileSyncOutlined, FileExcelOutlined } from '@ant-design/icons';

import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const MedicalList = () => {

    const { dimension } = useSelector((state) => state.web);
    const { barangay, designation, first_name, last_name } = useSelector((state) => state.user); 
    const history = useNavigate();
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);

    // Medical Table config
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name ',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Diagnosis',
            dataIndex: 'diagnosis',
            key: 'diagnosis'
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
                <Space size="middle">
                    <p>{
                    text.status === true ? 
                        "Medical Record has been reviewed."
                    :
                        "Awaiting for review."
                    }</p>
                </Space>
            ),
            responsive: ['lg']
        },
        {
            title: 'Severity',
            key: 'tags',
            render: (text, record) => (
                <Space size="middle">
                    <Tag color={text.outlier >= 8 ? "#fb6666" : text.outlier >= 5 ? "#ffc04c" : "#abde95"}>
                        {text.outlier >= 8 ? "Severe" : text.outlier >= 5 ? "Moderate" : "Mild"}
                    </Tag>
                </Space>
            ),
        },
        {
            title: 'Date Created',
            key: 'dateCreated',
            render: (text, record) => (
                <Space size="middle">

                    { moment(text.createdAt).format("MMMM DD,YYYY h:mm A") }
                </Space>
            ),
            responsive: ['lg']
        },
        ...(designation === "Doctor") ? [{
            title: 'Barangay',
            key: 'baranay',
            render: (text, record) => (
                <Space size="middle">
                    {text.barangay}
                </Space>
            ),
            responsive: ['lg']
        }] : [{ 
            responsive: ['xll']
        }],
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="View Medical Record" >
                        <Button
                            icon={<MedicineBoxOutlined />} 
                            onClick={() => {
                                history({
                                    pathname: `/dashboard/medical-records/view/${text._id}`
                                })
                            }}
                            type="primary"
                        >
                        </Button>
                    </Tooltip>
                    {
                        designation === "Doctor" &&
                        <Tooltip title="Update Medical Record" >
                            <Button
                                icon={<FileSyncOutlined />} 
                                onClick={() => {
                                    history({
                                        pathname: `/dashboard/medical-records/update/${text._id}`
                                    })
                                }}
                                type="primary"
                                style={{ background: "orange", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>
                    }
                    {
                        text.status !== true && designation === "Nurse" &&
                        <Tooltip title="Update Medical Record" >
                            <Button
                                icon={<FileSyncOutlined />} 
                                onClick={() => {
                                    history({
                                        pathname: `/dashboard/medical-records/update/${text._id}`
                                    })
                                }}
                                type="primary"
                                style={{ background: "orange", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>
                    }
                    {
                        text.status !== true && designation === "Doctor" &&
                        <Tooltip title="Approve Medical Record" >
                            <Button
                                icon={<FileSyncOutlined />} 
                                onClick={() => {
                                    const approveRecord = async () => {
                                        try {
                                            dispatch(changeLoader({ loading: true }))
                                            const postFormData = await axiosAPI.patch(`medical-record/private/update-record`, {
                                                status: true,
                                                approvedBy: `${first_name} ${last_name} (${designation})`,
                                                id: text._id
                                            })
                                            dispatch(changeLoader({ loading: false }));
                                            toasterRequest({ payloadType: "success", textString: postFormData.data.message});
                                            getCellData()
                                        } catch (err) {
                                            dispatch(changeLoader({ loading: false }))
                                            err.response ? 
                                                toasterRequest({ payloadType: "error", textString: err.response.data.message})
                                            :
                                                toasterRequest({ payloadType: "error", textString: err.message});
                                        }
                                    }
                                    approveRecord()
                                }}
                                type="primary"
                                style={{ background: "green", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>
                    }
                    {
                        designation === "Doctor" &&
                        <Tooltip title="Delete Medical Record" >
                            <Button
                                icon={<FileExcelOutlined />} 
                                onClick={() => {
                                    const deleteRecord = async () => {
                                        try {
                                            dispatch(changeLoader({ loading: true }))
                                            const postFormData = await axiosAPI.patch(`medical-record/private/update-record`, {
                                                id: text._id,
                                                disable: true
                                            })
                                            dispatch(changeLoader({ loading: false }));
                                            toasterRequest({ payloadType: "success", textString: postFormData.data.message});
                                            getCellData()
                                        } catch (err) {
                                            dispatch(changeLoader({ loading: false }))
                                            err.response ? 
                                                toasterRequest({ payloadType: "error", textString: err.response.data.message})
                                            :
                                                toasterRequest({ payloadType: "error", textString: err.message});
                                        }
                                    }
                                    deleteRecord()
                                }}
                                type="primary"
                                style={{ background: "red", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>
                    }
                    {
                        text.status !== true && designation === "Nurse" &&
                        <Tooltip title="Delete Medical Record" >
                            <Button
                                icon={<FileExcelOutlined />} 
                                onClick={() => {
                                    const deleteRecord = async () => {
                                        try {
                                            dispatch(changeLoader({ loading: true }))
                                            const postFormData = await axiosAPI.patch(`medical-record/private/update-record`, {
                                                id: text._id,
                                                disable: true
                                            })
                                            dispatch(changeLoader({ loading: false }));
                                            toasterRequest({ payloadType: "success", textString: postFormData.data.message});
                                            getCellData()
                                        } catch (err) {
                                            dispatch(changeLoader({ loading: false }))
                                            err.response ? 
                                                toasterRequest({ payloadType: "error", textString: err.response.data.message})
                                            :
                                                toasterRequest({ payloadType: "error", textString: err.message});
                                        }
                                    }
                                    deleteRecord()
                                }}
                                type="primary"
                                style={{ background: "red", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>
                    }
                </Space>
            ),
        },

    ];

    const fields = {
        full_name: {
            header: "Full Name",
            formatter: (_fieldValue, record) => {
                return record.full_name;
            },
        },
        email: {
            header: "Email",
            formatter: (_fieldValue, record) => {
                console.log(record)
                return record.email;
            },
        },
        phone_number: {
            header: "Phone Number",
            formatter: (_fieldValue, record) => {
                return `${String(record.phone_number).substring(0, 3)}-${String(record.phone_number).substring(3, 6)}-${String(record.phone_number).substring(6, 9)}-${String(record.phone_number).substring(9, 12)}`;
            },
        },
        diagnosis: {
            header: "Diagnosis",
            formatter: (_fieldValue, record) => {
                return record.diagnosis;
            },
        },
        detailed_report: {
            header: "Detailed Report",
            formatter: (_fieldValue, record) => {
                return record.detailed_report;
            },
        },
        outlier: {
            header: "Outlier Score",
            formatter: (_fieldValue, record) => {
                return record.outlier;
            },
        },
        createdAt: {
            header: "Date Creation",
            formatter: (_fieldValue, record) => {
                return moment(record.createdAt).format("MMMM DD,YYYY h:mm a")
            },
        }
    }

    const btnProps =  {
        type: "primary",
        icon: <FileExcelOutlined />,
        children: <span>Export to EXCEL</span>
    }

    const getCellData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let medicalRecords = await axiosAPI.get(`medical-record/private/officer?barangay=${barangay}&designation=${designation}`);
            const filteredData = medicalRecords.data.payload.map((record) => {
                return {
                    full_name: `${record.first_name} ${record.last_name}`,
                    email: record.email,
                    phone_number: record.phone_number,
                    diagnosis: record.diagnosis,
                    detailed_report: record.detailed_report,
                    outlier: record.outlier,
                    createdAt: record.createdAt,
                    status: record.status,
                    _id: record._id,
                    ...(designation === "Doctor") && { barangay: record.barangay}
                }
            });
            setTableData(filteredData)
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
        getCellData()
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
                    title="Medical Record"
                    subTitle={dimension >= 4 ? `All medical records under Barangay ${barangay}.` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={designation === "Doctor" || designation === "Nurse" ? 
                        [
                            <Button 
                            icon={<MedicineBoxOutlined />}
                            key="3" onClick={() => {
                                history({
                                    pathname: `/dashboard/medical-records/create`
                                })
                            }} style={{ color: "#AD72B7" }}>Create Record</Button>
                        ]
                    : 
                        []
                    }
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                {/*Medical Record Table*/}
                <Table 
                    columns={columns}
                    dataSource={tableData}
                    scroll={{ x: 500 }} 
                    searchable
                    exportableProps={{ 
                        fields,
                        showColumnPicker: true,
                        btnProps: btnProps,
                        fileName: "medical-record",
                        disabled: tableData.length === 0 ? true : false
                    }} />
            </Layout.Content>
        </React.Fragment>
    );
};

export default MedicalList;
