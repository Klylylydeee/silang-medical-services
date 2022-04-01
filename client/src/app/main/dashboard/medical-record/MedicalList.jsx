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
import { MedicineBoxOutlined, FileSyncOutlined, FileExcelOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import saveAs from "file-saver";
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
                text.disable === true ?
                <Space size="middle">
                    <Tag color={"#fb6666"}>
                        Disabled by <p style={{ padding: 0, margin: 0 }}>{text.disabledBy}</p>
                    </Tag>
                </Space>
                :
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
                                                disable: true,
                                                disabledBy: `${first_name} ${last_name} (${designation}) `
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
                    {
                        text.request_change === true && designation === "Doctor"  &&
                        <Tooltip title="PIN Renewal Approval" >
                            <Button
                                icon={<IssuesCloseOutlined />} 
                                onClick={() => {
                                    const approvePINChange = async () => {
                                        try {
                                            dispatch(changeLoader({ loading: true }));
                                            const unique_identifier_string = text._id.toString().split("");
                                            const randomSelect = () => Math.floor(Math.random() * unique_identifier_string.length);
                                            const postFormData = await axiosAPI.patch(`medical-record/private/update-record`, {
                                                id: text._id,
                                                request_change: false,
                                                pin: `${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}`
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
                                    approvePINChange()
                                }}
                                type="primary"
                                style={{ background: "#abde95", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>

                    }
                    {
                        text.request_change === true && designation === "Nurse"  &&
                        <Tooltip title="PIN Renewal Approval" >
                            <Button
                                icon={<IssuesCloseOutlined />} 
                                onClick={() => {
                                    const approvePINChange = async () => {
                                        try {
                                            dispatch(changeLoader({ loading: true }));
                                            const unique_identifier_string = text._id.toString().split("");
                                            const randomSelect = () => Math.floor(Math.random() * unique_identifier_string.length);
                                            const postFormData = await axiosAPI.patch(`medical-record/private/update-record`, {
                                                id: text._id,
                                                request_change: false,
                                                pin: `${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}`
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
                                    approvePINChange()
                                }}
                                type="primary"
                                style={{ background: "#abde95", borderColor: "white" }}
                            >
                            </Button>
                        </Tooltip>

                    }
                </Space>
            ),
        },

    ];

    // const fields = {
    //     full_name: {
    //         header: "Full Name",
    //         formatter: (_fieldValue, record) => {
    //             return record.full_name;
    //         },
    //     },
    //     email: {
    //         header: "Email",
    //         formatter: (_fieldValue, record) => {
    //             console.log(record)
    //             return record.email;
    //         },
    //     },
    //     phone_number: {
    //         header: "Phone Number",
    //         formatter: (_fieldValue, record) => {
    //             return `${String(record.phone_number).substring(0, 3)}-${String(record.phone_number).substring(3, 6)}-${String(record.phone_number).substring(6, 9)}-${String(record.phone_number).substring(9, 12)}`;
    //         },
    //     },
    //     diagnosis: {
    //         header: "Diagnosis",
    //         formatter: (_fieldValue, record) => {
    //             return record.diagnosis;
    //         },
    //     },
    //     detailed_report: {
    //         header: "Detailed Report",
    //         formatter: (_fieldValue, record) => {
    //             return record.detailed_report;
    //         },
    //     },
    //     outlier: {
    //         header: "Outlier Score",
    //         formatter: (_fieldValue, record) => {
    //             return record.outlier;
    //         },
    //     },
    //     createdAt: {
    //         header: "Date Creation",
    //         formatter: (_fieldValue, record) => {
    //             return moment(record.createdAt).format("MMMM DD,YYYY h:mm a")
    //         },
    //     }
    // }

    // const btnProps =  {
    //     type: "primary",
    //     icon: <FileExcelOutlined />,
    //     children: <span>Export to EXCEL</span>
    // }

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
                    barangay: record.barangay,
                    disable: record.disable,
                    disabledBy: record.disabledBy,
                    request_change: record.request_change
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
                            }} style={{ color: "#AD72B7" }}>Create Record</Button>,

                        ]
                    : 
                        designation === "Chairman" ?
                        [
                            <Button 
                            icon={<MedicineBoxOutlined />}
                            key="3" onClick={async () => {
                                dispatch(changeLoader({ loading: true }));
                                const postRecordData = await axiosAPI.post(`export/records-csv`, {
                                    first_name,
                                    last_name,
                                    designation
                                })
                                const working = () => {
                                    var ExcelJSWorkbook = new ExcelJS.Workbook();
                                    ExcelJSWorkbook.company = "Silang Medical Services";
                                    ExcelJSWorkbook.title = "Silang Medical Services - Medical Records Data";
                                    ExcelJSWorkbook.category = "Health Information and Communication"
                                    ExcelJSWorkbook.description = postRecordData.data.payload
                                    ExcelJSWorkbook.creator = `Silang Medical Services - ${last_name}, ${first_name} (${barangay} - ${designation}) - `;
                                    ExcelJSWorkbook.lastModifiedBy = `${last_name}, ${first_name} (${barangay} - ${designation})`;
                                    ExcelJSWorkbook.created = new Date();
                                    ExcelJSWorkbook.modified = new Date();
                                    ExcelJSWorkbook.lastPrinted = new Date();
                                    ExcelJSWorkbook.properties.date1904 = true;
                                    var workbook = ExcelJSWorkbook.addWorksheet("Medical Records Active");
                                    workbook.views = [
                                        {
                                            x: 0, y: 0, width: 10000, height: 20000,
                                            firstSheet: 0, activeTab: 1, visibility: 'visible'
                                        }
                                    ];
                                    workbook.columns = [
                                        { header: 'System ID', key: 'id' },
                                        { header: 'Barangay', key: 'barangay' },
                                        { header: 'Name', key: 'name'},
                                        { header: 'Phone Number', key: 'phone_number'},
                                        { header: 'Email Address', key: 'email'},
                                        { header: 'Diagnosis', key: 'diagnosis'},
                                        { header: 'Diagnosis Report', key: 'report'},
                                        { header: 'Severity (Scale 1 - 10)', key: 'severity'},
                                        { header: 'Date of Creation', key: 'doc', type: 'date'},
                                        { header: 'Status', key: 'status'}
                                    ];
                                    var workbookDisabled = ExcelJSWorkbook.addWorksheet("Medical Records Disabled");
                                    workbookDisabled.views = [
                                        {
                                            x: 0, y: 0, width: 10000, height: 20000,
                                            firstSheet: 0, activeTab: 1, visibility: 'visible'
                                        }
                                    ];
                                    workbookDisabled.columns = [
                                        { header: 'System ID', key: 'id' },
                                        { header: 'Barangay', key: 'barangay' },
                                        { header: 'Name', key: 'name'},
                                        { header: 'Phone Number', key: 'phone_number'},
                                        { header: 'Email Address', key: 'email'},
                                        { header: 'Diagnosis', key: 'diagnosis'},
                                        { header: 'Diagnosis Report', key: 'report'},
                                        { header: 'Severity (Scale 1 - 10)', key: 'severity'},
                                        { header: 'Date of Creation', key: 'doc', type: 'date'},
                                        { header: 'Status', key: 'status'}
                                    ];

                                    tableData.map((recordData) => {
                                        if(recordData.disabledBy === undefined){
                                            workbook.addRow({ 
                                                id: recordData._id,
                                                barangay: recordData.barangay,
                                                name: recordData.full_name,
                                                phone_number: recordData.phone_number,
                                                email: recordData.email,
                                                diagnosis: recordData.diagnosis,
                                                report: recordData.detailed_report,
                                                severity: recordData.outlier,
                                                doc: moment(recordData.createdAt).format("MMMM DD,YYYY"),
                                                status: "true"
                                            });
                                        } else {
                                            workbookDisabled.addRow({ 
                                                id: recordData._id,
                                                barangay: recordData.barangay,
                                                name: recordData.full_name,
                                                phone_number: recordData.phone_number,
                                                email: recordData.email,
                                                diagnosis: recordData.diagnosis,
                                                report: recordData.detailed_report,
                                                severity: recordData.outlier,
                                                doc: moment(recordData.createdAt).format("MMMM DD,YYYY"),
                                                status: `Disabled by ${recordData.disabledBy}`
                                            });
                                        }
                                        return true;
                                    });
                                    workbook.protect(process.env.REACT_APP_JWT_BACKEND, {
                                        formatCells: true,
                                        formatColumns: true,
                                        formatRows: true,
                                        insertRows: true,
                                        insertColumns: false,
                                        insertHyperlinks: true,
                                        deleteRows: true,
                                        deleteColumns: false,
                                        sort: true,
                                        autoFilter: true
                                    })
                                    workbookDisabled.protect(process.env.REACT_APP_JWT_BACKEND, {
                                        formatCells: true,
                                        formatColumns: true,
                                        formatRows: true,
                                        insertRows: true,
                                        insertColumns: false,
                                        insertHyperlinks: true,
                                        deleteRows: true,
                                        deleteColumns: false,
                                        sort: true,
                                        autoFilter: true
                                    })
                                    dispatch(changeLoader({ loading: false }));
                                    // https://github.com/exceljs/exceljs/issues/969
                                    // https://codesandbox.io/s/yq7r1oror1?file=/App.js:603-618
                                    ExcelJSWorkbook.xlsx.writeBuffer().then(function(buffer) {
                                        saveAs(
                                        new Blob([buffer], { type: "application/octet-stream" }),
                                        `Silang Medical Services - Medical Records.xlsx`
                                        );
                                    });
                                }
                                setTimeout(()=>{
                                    working();
                                }, 200)
                            }} style={{ color: "#AD72B7" }}>Export Medical Records</Button>,
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
                    searchable={true}
                    // {...(designation === "Chairman" ?
                    //     {
                    //         exportableProps: { 
                    //             fields,
                    //             showColumnPicker: true,
                    //             btnProps: btnProps,
                    //             fileName: "medical-record",
                    //             disabled: tableData.length === 0 ? true : false
                    //         }
                    //     } 
                    // : 
                    //     {}
                    // )}
                    searchableProps={{ fuzzySearch: true }}
                    />
            </Layout.Content>
        </React.Fragment>
    );
};

export default MedicalList;
