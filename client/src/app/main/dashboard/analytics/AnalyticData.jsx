import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//Ant Design layout
import { Pie } from '@ant-design/plots';
import { Comment, Avatar, Form, Button, List, Input, Col, Layout, PageHeader } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

//Scss Styling
import '../../../../styles/analytics-specific.scss'

//Comments Config
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const AnalyticData = () => {
    const { dimension } = useSelector((state) => state.web);
    const { barangay } = useSelector((state) => state.user); 
    const params = useParams();

    //Comments Config
    const [state, setState] = useState({
        comments: [],
        submitting: false,
        value: ""
    });

    useEffect(() => {
        console.log(state);
    }, [state]);

    const handleSubmit = () => {
        setState({
            ...state,
            submitting: true
        });

        setTimeout(() => {
            setState({
                submitting: false,
                value: "",
                comments: [
                    ...state.comments,
                    {
                        author: "Jether Haniel",
                        avatar: "https://joeschmoe.io/api/v1/random",
                        content: <p>{state.value}</p>,
                        datetime: moment().fromNow()
                    }
                ]
            });
        }, 1000);
    };

    const handleChange = (e) => {
        setState({
            ...state,
            value: e.target.value
        });
    };

    //Pie chart config
    const data = [
        {
            type: 'Jether',
            value: 27,
        },
        {
            type: 'Klyde',
            value: 25,
        },
        {
            type: 'Rondel',
            value: 18,
        },
        {
            type: 'Kenn',
            value: 15,
        },
        {
            type: 'Haniel',
            value: 10,
        },
        {
            type: 'Charles',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <Layout.Content>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }} className="analytics-monthly-container">
                <div style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                    <PageHeader
                        ghost={false}
                        title="Monthly Analytics"
                        subTitle={dimension >= 4 ? `Contains the analytics for Barangay ${barangay}.` : ""}
                        style={{ padding: 0, backgroundColor: "#AD72B7", borderRadius: "5px" }}
                    />
                </div>
                <Pie {...config} />

                <>
                    <CommentList comments={state.comments} />
                    <Comment
                        avatar={
                            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                        }
                        content={
                            <Editor
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                submitting={state.submitting}
                                value={state.value}
                            />
                        }
                    />
                </>
            </Col>
        </Layout.Content>
    )
}

export default AnalyticData