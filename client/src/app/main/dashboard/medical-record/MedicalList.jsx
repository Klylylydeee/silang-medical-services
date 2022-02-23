import React from "react";

//Ant Design layout
import { Col, Layout, Table, Tag, Space } from 'antd';

//Scss Styling
import '../../../../styles/analytics.scss'

const medicalList = () => {

    const columns = [
        {
            title: 'Record ID',
            dataIndex: 'recordID',
            key: 'recordID',
        },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Severity',
            key: 'tags',
            dataIndex: 'tags',
            responsive: ['md'],
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 6 ? 'geekblue' : 'green';
                        if (tag === 'severe') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
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
            responsive: ['md'],
            render: (text, record) => (
                <Space size="middle">
                    <a>View</a>
                    <a>Edit</a>
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
        <Layout.Content>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }} className="record-container">
                <div className="header">
                    <h1>Welcome to the Medical Records</h1>
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam neque tellus, maximus ut tristique et, rutrum ut quam. Curabitur eu odio metus. Pellentesque scelerisque risus id turpis rutrum, et vulputate lectus fermentum.</h2>
                </div>
                <Table columns={columns} dataSource={data} />
            </Col>
        </Layout.Content>
    );
};

export default medicalList;
