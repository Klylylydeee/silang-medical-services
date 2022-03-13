import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Layout, PageHeader, Alert } from 'antd';
import { Area } from '@ant-design/plots';
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";

function Analytic() {
    const { dimension } = useSelector((state) => state.web);
    const { barangay, designation } = useSelector((state) => state.user); 

    const dispatch = useDispatch();

    const history = useNavigate();

    const [graphData, setGraphData] = useState([]);

    const getAnalyticsData = async () => {
        try {
            dispatch(changeLoader({ loading: true }));
            let analyticsData = await axiosAPI.get(`analytics/?barangay=${barangay}`);
            setGraphData(analyticsData.data.payload)
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
        getAnalyticsData();
    // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            {
                designation !== "Doctor" &&
                <React.Fragment>
                    <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                        <PageHeader
                            ghost={false}
                            title="Yearly Analytics" 
                            subTitle={dimension >= 4 ? `Contains the analytics for Barangay ${barangay}.` : ""}
                            style={{ padding: 0, backgroundColor: "#AD72B7" }}
                        />
                    </Layout.Content>
                    <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                    <Area 
                        height={500}
                        width={500}
                        data={graphData}
                        xField="datetime"
                        yField="value"
                        seriesField="category"
                        slider={{ start: 0.1, end: 0.9}}
                        onReady={(plot) => {
                            plot.on('axis-label:click', (data) => {
                                history({
                                    pathname: `/dashboard/analytics/${data.gEvent.target.attrs.text.split(" ")[0]}/${data.gEvent.target.attrs.text.split(" ")[2]}`
                                })
                            });
                        }}
                        loading={false}
                    />
                    </Layout.Content>
                    <Layout.Content style={{ marginBottom: "15px", borderRadius: "5px" }}>
                        <Alert message="To see the specific data for a pertaining year and month, please select the 'Year and Month' below the graph." type="info" closeText="Close Now" />
                    </Layout.Content>
                </React.Fragment>
            }
            {
                designation === "Doctor" &&
                <React.Fragment>
                    <Layout.Content style={{ marginBottom: "15px", borderRadius: "5px" }}>
                        <Alert message="To see the specific data for a pertaining year and month, please select the 'Year and Month' below the graph." type="info" closeText="Close Now" />
                    </Layout.Content>
                    <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                        <PageHeader
                            ghost={false}
                            title="Lumil Analytics" 
                            subTitle={dimension >= 4 ? `Contains the analytics for Barangay Lumil` : ""}
                            style={{ padding: 0, backgroundColor: "#AD72B7" }}
                        />
                    </Layout.Content>
                    <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                    <Area 
                        height={500}
                        width={500}
                        data={graphData}
                        xField="datetime"
                        yField="value"
                        seriesField="category"
                        slider={{ start: 0.1, end: 0.9}}
                        onReady={(plot) => {
                            plot.on('axis-label:click', (data) => {
                                history({
                                    pathname: `/dashboard/analytics/${data.gEvent.target.attrs.text.split(" ")[0]}/${data.gEvent.target.attrs.text.split(" ")[2]}?barangay=Lumil`
                                })
                            });
                        }}
                        loading={false}
                    />
                    </Layout.Content>
                    <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                        <PageHeader
                            ghost={false}
                            title="Puting Kahoy Analytics" 
                            subTitle={dimension >= 4 ? `Contains the analytics for Barangay Puting Kahoy` : ""}
                            style={{ padding: 0, backgroundColor: "#AD72B7" }}
                        />
                    </Layout.Content>
                    <Layout.Content style={{ backgroundColor: "white", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                    <Area 
                        height={500}
                        width={500}
                        data={graphData}
                        xField="datetime"
                        yField="value"
                        seriesField="category"
                        slider={{ start: 0.1, end: 0.9}}
                        onReady={(plot) => {
                            plot.on('axis-label:click', (data) => {
                                history({
                                    pathname: `/dashboard/analytics/${data.gEvent.target.attrs.text.split(" ")[0]}/${data.gEvent.target.attrs.text.split(" ")[2]}?barangay=Puting Kahoy`
                                })
                            });
                        }}
                        loading={false}
                    />
                    </Layout.Content>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default Analytic;