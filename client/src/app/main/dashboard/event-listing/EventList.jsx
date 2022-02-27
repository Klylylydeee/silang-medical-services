import React, { useState, useEffect } from 'react';
import { Calendar, Alert, Badge, Layout, PageHeader, Button } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasterRequest from "src/app/util/toaster";
import { axiosAPI } from "src/app/util/axios";
import { changeLoader } from "src/app/store/web/webInformation";
import { addCellData, resetCell } from "src/app/store/calendar/calendarInformation";
import "./eventTable.scss"

const DataCell = (value) => {
    const { cell } = useSelector((state) => state.calendar); 
    return (
        <ul className="events">
            {
                cell[`${moment(value).format("YYYY/MM/DD")}`] !== undefined &&
                cell[`${moment(value).format("YYYY/MM/DD")}`].map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))
            }
        </ul>
    );
}

const EventList = () => {
    const { dimension } = useSelector((state) => state.web); 
    const { barangay } = useSelector((state) => state.user); 
    const history = useNavigate();
    const dispatch = useDispatch();
    const [eventsDate, setEventsDate] = useState({
        value: moment(new Date()),
        selectedValue: moment(new Date())
    });
    const onSelect = dateVal => {
        setEventsDate((prevData) => {
            return {
                ...prevData,
                selectedValue: dateVal
            }
        })
    };

    const onPanelChange = value => {
        setEventsDate((prevData) => {
            return {
                ...prevData,
                value: value
            }
        })
    };

    const getCellData = async () => {
        try {
            dispatch(changeLoader({ loading: true }))
            let eventData = await axiosAPI.get(`events/list?barangay=${barangay}`);
            dispatch(changeLoader({ loading: false }));
            toasterRequest({ payloadType: "success", textString: eventData.data.message});
            dispatch(addCellData({
                cell: eventData.data.payload
            }))
        } catch (err) {
            dispatch(changeLoader({ loading: false }))
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    }

    useEffect(() => {
        dispatch(resetCell())
        getCellData()
    }, [])
    
    return (
        <React.Fragment>
            <Layout.Content style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
                <PageHeader
                    ghost={false}
                    title="Event Listing" 
                    subTitle={dimension >= 4 ? "Contains all the activities and missions of the Barangay Healthcare." : ""}
                    style={{ padding: 0, backgroundColor: "#AD72B7" }}
                    extra={[
                        <Button key="3" onClick={() => {
                            history({
                                pathname: `/dashboard/users/create/invitation`
                            })
                        }} style={{ color: "#AD72B7" }}>Create Event</Button>
                    ]}
                />
            </Layout.Content>
            <Layout.Content style={{ backgroundColor: "white", padding: "20px", marginBottom: "15px", borderRadius: "5px" }}>
                {/* <Alert message={`You selected date: ${eventsDate.selectedValue && eventsDate.selectedValue.format('YYYY-MM-DD')}`}/> */}
                <Calendar dateCellRender={DataCell} mode={"month"} value={eventsDate.value} onSelect={onSelect} onPanelChange={onPanelChange} />
            </Layout.Content>
        </React.Fragment>
    );
};

export default EventList;
