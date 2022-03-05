import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { Pie } from '@ant-design/plots';
import { Comment, Form, Button, List, Input, Layout, PageHeader, Divider, Tooltip } from "antd";
import { CloseSquareOutlined } from '@ant-design/icons';
import "./data.scss"

const CommentList = ({ comments, author, onClick }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(props) => {
            return (
                <Comment {...props}
                style={{ position: "relative" }}
                actions={[
                    ...(props.author === `${author.first_name} ${author.last_name}`) && [
                        <Tooltip title="Remove Comment" >
                            <Button
                                icon={<CloseSquareOutlined />} 
                                onClick={() => { onClick(props._id) }}
                                type="primary"
                                style={{ position: "absolute", top: 0, bottom: 0, margin: "auto 0", right: 0 }}
                            >
                            </Button>
                        </Tooltip>
                    ]
                ]} />
            )
        }}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <Input.TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                style={{ margin: "0" }}
                type="primary"
            >
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const AnalyticData = () => {
    const { dimension } = useSelector((state) => state.web);
    const { barangay, first_name, last_name } = useSelector((state) => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const [pieData, setPieData] = useState([]);

    const [state, setState] = useState({
        comments: [],
        value: ""
    });

    const getComments = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.get(`analytics/specific-comments?barangay=${barangay}&year=${params.year}&month=${params.month}`);
            setState((prevData) => {
                return {
                    ...prevData,
                    comments: eventData.data.comments
                }
            })
            dispatch(changeLoader({ loading: false }));
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }
    const addComment = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.post(`analytics/add-comments?barangay=${barangay}&year=${params.year}&month=${params.month}&comment=${state.value}&author=${first_name} ${last_name}`);
            toasterRequest({ payloadType: "success", textString: eventData.data.message});
            setState({
                ...state,
                value: ""
            });
            getComments();
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }
    const removeComment = async (id) => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.patch(`analytics/remove-comments?_id=${id}`);
            toasterRequest({ payloadType: "success", textString: eventData.data.message});
            getComments();
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    const handleSubmit = () => {
        addComment();
    };

    const handleChange = (e) => {
        setState({
            ...state,
            value: e.target.value
        });
    };

    const getData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.get(`analytics/specific?barangay=${barangay}&year=${params.year}&month=${params.month}`);
            setPieData(eventData.data.payload)
            setState((prevData) => {
                return {
                    ...prevData,
                    comments: eventData.data.comments
                }
            })
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
        getData();
    // eslint-disable-next-line
    }, []);
    
    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title={`${params.month} ${params.year} - Analytics`} 
                    subTitle={dimension >= 4 ? `Contains the analytics for Barangay ${barangay}.` : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Pie 
                    appendPadding={10}
                    data={pieData}
                    angleField="value"
                    colorField="type"
                    radius={0.8}
                    label={{type: 'outer', content: '{name} {percentage}'}}
                    interactions={[
                        {
                            type: 'pie-legend-active',
                        },
                        {
                            type: 'element-active',
                        },
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Divider orientation="left" style={{ fontSize: "18px", color: "black", fontWeight: 500 }}>Comments</Divider>
                <CommentList comments={state.comments} author={{ first_name, last_name }} onClick={removeComment} />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px 0 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <Comment
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={state.value}
                        />
                    }
                />
            </Layout.Content>
        </React.Fragment>
    )
}

export default AnalyticData