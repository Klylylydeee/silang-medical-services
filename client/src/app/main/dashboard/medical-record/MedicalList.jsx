import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Ant Design layout
import {
    Layout,
    Table,
    Tag,
    Space,
    PageHeader,
    Button
} from 'antd';

//Scss Styling
import '../../../../styles/medical-list.scss'

const MedicalList = () => {

    const { dimension } = useSelector((state) => state.web);
    const { barangay } = useSelector((state) => state.user); 
    const history = useNavigate();
    

    // Medical Table config
    const columns = [
        {
            title: 'Record ID',
            dataIndex: 'recordID',
            key: 'recordID',
            responsive: ['md']
        },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Severity',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map((tag, index) => {
                        let color = tag.length > 6 ? 'geekblue' : 'green';
                        if (tag === 'severe') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={index}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            responsive: ['lg']
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            responsive: ['lg']
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <p>View</p>
                    <p>Edit</p>
                </Space>
            ),
        },

    ];

    const data = [
        {
            recordID: '001',
            key: '1',
            name: 'Dustin Etits',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['moderate'],
        },
        {
            recordID: '002',
            key: '2',
            name: 'Rondel Hallare',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['severe'],
        },
        {
            recordID: '003',
            key: '3',
            name: 'Klyde Guevarra',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['moderate'],
        },
        {
            recordID: '004',
            key: '4',
            name: 'Jether Haniel',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['normal'],
        },
        {
            recordID: '005',
            key: '5',
            name: 'Kenn Famarin',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['severe'],
        },
        {
            recordID: '006',
            key: '6',
            name: 'Edlyk Jabul',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['moderate'],
        },
        {
            recordID: '007',
            key: '7',
            name: 'Rondelh Pengu',
            dateCreated: 'January 1, 2022',
            status: 'Waiting for Doctor’s Diagnosis',
            tags: ['normal'],
        },
    ];

    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Medical Record"
                    subTitle={dimension >= 4 ? `All medical records under Barangay ${barangay}.` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/medical-records/create`
                            })
                        }} style={{ color: "#AD72B7" }}>New Record</Button>
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                {/*Medical Record Table*/}
                <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
            </Layout.Content>
        </React.Fragment>
    );
};

export default MedicalList;
