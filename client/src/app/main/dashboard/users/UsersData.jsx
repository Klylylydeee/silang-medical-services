import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Button, Input, Space, Tooltip, Modal } from 'antd';
import { useSelector } from "react-redux";
import { Table } from "ant-table-extensions";
import Highlighter from "react-highlight-words";
import { SearchOutlined, UserOutlined, SettingOutlined, DisconnectOutlined, ExclamationCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import moment from "moment";

const { confirm } = Modal;


const UsersData = () => {

    const { dimension } = useSelector((state) => state.web); 
    const { barangay, designation } = useSelector((state) => state.user); // eslint-disable-next-line
    // eslint-disable-next-line

    const history = useNavigate();

    const [ state, setState ] = useState({
        searchText: "",
        searchedColumn: "",
        searchInput: ""
    });

    const [ loadingStatus, setLoadingStatus ] = useState(true);
    
    const [ data, setData ] = useState([]);

    const getTableData = async () => {
        try{
            let tableData = await axiosAPI.get(`settings/user-list?barangay=${barangay}`);
            setData(tableData.data.payload)
            setLoadingStatus(false)
        } catch (err) {
            setLoadingStatus(false)
            toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const changeUserStatus = async (payload) => {
        try{
            let statusData = await axiosAPI.post(`settings/user-status`, payload);
            toasterRequest({ payloadType: "success", textString: statusData.data.message });
            getTableData()
        } catch (err) { 
            setLoadingStatus(false)
            toasterRequest({ payloadType: "error", textString: "Status has been changed."});
        }
    }

    const passwordRequest = async (payload) => {
        try{
            let requestLoad = await axiosAPI.post(`settings/user-pass-request`, payload);
            toasterRequest({ payloadType: "success", textString: requestLoad.data.message });
            getTableData()
        } catch (err) { 
            setLoadingStatus(false)
            toasterRequest({ payloadType: "error", textString: err.message});
        }
    } 
 
    useEffect(() => {
        getTableData();
    // eslint-disable-next-line
    }, [])

    const showDelete = (data) => {
        confirm({
            title: 'Do you want to disable this user?',
            icon: <ExclamationCircleOutlined />,
            content: 'Note: All created and related documents to this user will still exists but the user will no longer be able to have access and authority in the portal.',
            onOk() {
                changeUserStatus({
                    _id: data._id,
                    barangay: data.barangay,
                    status: data.status
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const showEnable = (data) => {
        confirm({
            title: 'Do you want to re-enable this user?',
            icon: <ExclamationCircleOutlined />,
            content: 'Note: This user will regain his/her access and authority in the portal and will be able to do authoritive task pertaining to his/her designation again.',
            onOk() {
                changeUserStatus({
                    _id: data._id,
                    barangay: data.barangay,
                    status: data.status
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const resetPassword = (data) => {
        console.log(data)
        confirm({
            title: 'Do you want to request a password reset to this user?',
            icon: <ExclamationCircleOutlined />,
            content: 'Note: This user will receive an email containing a link to change their existing password.',
            onOk() {
                passwordRequest({
                    _id: data._id
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setState({ searchText: "" });
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        state.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => state.searchInput.select(), 100);
            }
        },
        render: (text) =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
                
    const columns = [
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "First Name",
            width: "15%",
            ...getColumnSearchProps("first_name"),
            sorter: (a, b) => a.first_name.length - b.first_name.length
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "Last Name",
            width: "15%",
            ...getColumnSearchProps("last_name"),
            sorter: (a, b) => a.last_name.length - b.last_name.length
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "Designation",
            width: "15%",
            ...getColumnSearchProps("designation"),
            sorter: (a, b) => a.last_name.length - b.last_name.length
        },
        {
            title: 'Status',
            key: 'Status',
            width: "15%",
            render: (text, row) => (
                <Space size="middle">
                    {text.status === true ? "Active" : "Inactive" }
                </Space>
            ),
        },
        {
            title: 'Last Accessed',
            key: 'Last Accessed',
            width: "30%",
            render: (text, row) => (
                <Space size="middle">
                    {moment(text.updatedAt).format("MMMM DD, YYYY h:mm A")}
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, row) => (
                <Space size="middle">
                    <Tooltip title="View User Details">
                        <Button type="primary" onClick={()=> { history({
                            pathname: `/dashboard/users/view/${text._id}`,
                            search: `?barangay=${text.barangay}`,
                        }) }}>
                            <UserOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title={text.createdAt === text.updatedAt ? "User has not been verified" : "Request Password Reset"}>
                        <Button type="danger" style={{ background: "orange", borderColor: "white" }}
                            onClick={()=> { 
                                resetPassword(text)
                            }}
                            disabled={text.createdAt === text.updatedAt}
                        >
                            <SettingOutlined />
                        </Button>
                    </Tooltip>
                    {
                        designation === "Staff" && text.designation === "Chairman" ? 
                            <React.Fragment />
                        :
                            <Tooltip title={text.status === true ? "Disable User" : text.createdAt === text.updatedAt ? "User has not been verified" : "Enable User"}>
                                {
                                    text.status === true ?
                                        <Button type="danger" style={{ background: "red", borderColor: "white" }}
                                            onClick={()=> { 
                                                showDelete(text)
                                            }}
                                        >
                                            <DisconnectOutlined />
                                        </Button>
                                    :
                                        <Button type="danger" style={{ background: "green", borderColor: "white" }}
                                            onClick={()=> { 
                                                showEnable(text)
                                            }}
                                            disabled={text.createdAt === text.updatedAt}
                                        >
                                            <PlayCircleOutlined />
                                        </Button>

                                }
                            </Tooltip>
                    }
                </Space>
            ),
        }
    ];

    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title={` Barangay Users`} 
                    subTitle={dimension >= 4 ? `All users registered under Barangay ${barangay}.` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/users/create/invitation`
                            })
                        }} style={{ color: "#AD72B7" }}>New User</Button>
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Table columns={columns} dataSource={data} loading={loadingStatus} scroll={{ x: 500 }} />
            </Layout.Content>
        </React.Fragment>
    );
};

export default UsersData;
