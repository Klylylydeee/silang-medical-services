//Yarn Package
import React, { useState, useEffect } from 'react';

//Ant Design layout
import { Row, Col } from 'antd';
import { Divider, Button } from 'antd';

//Scss Styling
import '../../../../styles/default.scss'

//Temporary datas for statistics
const totalCitizen = 150;
const totalUsers = 90;
const totalMedical = 40;

function Default() {

    //useState for Date and Time functionality
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    //useState for Roles
    const [position, setPosition] = useState(1);

    //Temporary useState buttons to access other roles
    const staffClick = () => {
        setPosition(2) //set state into Staff Panels
    }
    const doctorClick = () => {
        setPosition(3) //set state into Nurse Panel
    }
    const nurseClick = () => {
        setPosition(4) //set state into Doctor Panel
    }
    const backClick = () => {
        setPosition(1) //set state back into Chairman panels
    }

    return (
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }} className="dashboard-container" >


                {/*Header Panels, consisting of basic statistics for the landing*/}
                {
                    position === 1 ?
                        <div>
                            <div className="header-container">
                                <div className="total-reg-citizen">
                                    <h3>Total Registered Citizen</h3>
                                    <h1>{totalCitizen}</h1> {/* Foreground statistic for Total Citizen*/}
                                    <h2>{totalCitizen}</h2> {/* Background statistic for Total Citizen*/}
                                </div>

                                <div className="total-users">
                                    <h3>Total Users</h3>
                                    <h1>{totalUsers}</h1> {/* Foreground statistic for Total Users*/}
                                    <h2>{totalUsers}</h2> {/* Background statistic for Total Users*/}
                                </div>

                                <div className="total-med-created">
                                    <h3>Total Medical Record</h3>
                                    <h1>{totalMedical}</h1> {/* Foreground statistic for Total Medical Record*/}
                                    <h2>{totalMedical}</h2> {/* Background statistic for Total Medical Record*/}
                                </div>
                            </div>

                            {/*Second row that consist of Events and Time and Date*/}
                            <div className="second-row">
                                <div className="recent-events">
                                    <h1>Recent and Previous Events</h1>
                                    <Divider orientation="left">This Week</Divider>


                                    <div className="events-list">
                                        <div className="listed-events">
                                            <h1>Libreng Tuli kaPuting Kahoy</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                        </div>

                                        <div className="listed-events">
                                            <h1>Libreng Bakuna kaPuting Kahoy</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                        </div>
                                    </div>

                                    <Divider orientation="left">Last Week</Divider>
                                    <div className="events-list">
                                        <div className="listed-events">
                                            <h1>Libreng Tuli kaPuting Kahoy</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                        </div>

                                        <div className="listed-events">
                                            <h1>Libreng Bakuna kaPuting Kahoy</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                        </div>
                                    </div>
                                </div>

                                {/*Functional Date and Time*/}
                                <div className="date-time">
                                    <h3 className="timeToday">
                                        {dateState.toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        })}</h3>
                                    <h3 className="dateToday">
                                        {dateState.toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}</h3>
                                </div>
                                {/*Change Role to Staff*/}
                                <Button type="primary" htmlType="submit" onClick={staffClick}>
                                    Change Role
                                </Button>

                            </div>
                        </div>

                        //Position 2 is for the role of Staff Members
                        : position === 2 ?

                            <div> {/*Staff dashboard layout*/}
                                <div className="second-row">
                                    <div className="recent-events">
                                        <h1>Recent and Previous Events</h1>
                                        <Divider orientation="left">This Week</Divider>


                                        <div className="events-list">
                                            <div className="listed-events">
                                                <h1>Libreng Tuli kaPuting Kahoy</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                            </div>

                                            <div className="listed-events">
                                                <h1>Libreng Bakuna kaPuting Kahoy</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                            </div>
                                        </div>

                                        <Divider orientation="left">Last Week</Divider>
                                        <div className="events-list">
                                            <div className="listed-events">
                                                <h1>Libreng Tuli kaPuting Kahoy</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                            </div>

                                            <div className="listed-events">
                                                <h1>Libreng Bakuna kaPuting Kahoy</h1>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Functional Date and Time*/}
                                    <div className="date-time">
                                        <h3 className="timeToday">
                                            {dateState.toLocaleString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}</h3>
                                        <h3 className="dateToday">
                                            {dateState.toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}</h3>
                                    </div>
                                    {/*Change Role to Doctor*/}
                                    <Button type="primary" htmlType="submit" onClick={doctorClick}>
                                        Change Role
                                    </Button>
                                    {/*Temporary back button*/}
                                    <Button type="primary" htmlType="submit" onClick={backClick}>
                                        Back
                                    </Button>
                                </div>
                            </div>

                            //Position 3 is for the role of Barangay Doctor
                            : position === 3 ?
                                <div>
                                    <div className="header-container">
                                        <div className="total-users">
                                            <h3>Total Users</h3>
                                            <h1>{totalUsers}</h1> {/* Foreground statistic for Total Users*/}
                                            <h2>{totalUsers}</h2> {/* Background statistic for Total Users*/}
                                        </div>

                                        <div className="total-med-created">
                                            <h3>Total Medical Record</h3>
                                            <h1>{totalMedical}</h1> {/* Foreground statistic for Total Medical Record*/}
                                            <h2>{totalMedical}</h2> {/* Background statistic for Total Medical Record*/}
                                        </div>
                                        <div className="date-time">
                                            <h3 className="timeToday">
                                                {dateState.toLocaleString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                })}</h3>
                                            <h3 className="dateToday">
                                                {dateState.toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}</h3>
                                        </div>
                                    </div>

                                    <div className="second-row">
                                        <div className="recent-events">
                                            <h1>Recent and Previous Events</h1>
                                            <Divider orientation="left">This Week</Divider>


                                            <div className="events-list">
                                                <div className="listed-events">
                                                    <h1>Libreng Tuli kaPuting Kahoy</h1>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                                </div>

                                                <div className="listed-events">
                                                    <h1>Libreng Bakuna kaPuting Kahoy</h1>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                                </div>
                                            </div>

                                            <Divider orientation="left">Last Week</Divider>
                                            <div className="events-list">
                                                <div className="listed-events">
                                                    <h1>Libreng Tuli kaPuting Kahoy</h1>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                                </div>

                                                <div className="listed-events">
                                                    <h1>Libreng Bakuna kaPuting Kahoy</h1>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id nisi rutrum, ullamcorper sapien sed, laoreet magna. Phasellus sed cursus urna, nec euismod nisi. Cras non nisl in enim tristique bibendum. </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="patient-panel">
                                            <h1>Recent Patients</h1>

                                            <div className="patient-list">
                                                <div className="listed-patient">
                                                    <h1>Edlyk Jabul Salsalani</h1>
                                                    <p>Age: 9000 years old</p>
                                                </div>
                                            </div>

                                            <div className="patient-list">
                                                <div className="listed-patient">
                                                    <h1>Jether Haniel</h1>
                                                    <p>Address: Barangay Dito, Sabandang doon, Katabi ng ganto City</p>
                                                </div>
                                            </div>
                                            {/*Change Role to Nurse*/}
                                            <Button type="primary" htmlType="submit" onClick={nurseClick}>
                                                Change Role
                                            </Button>
                                            {/*Temporary back button*/}
                                            <Button type="primary" htmlType="submit" onClick={backClick}>
                                                Back
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                //Position 4 is for the role of Barangay Nurses
                                :
                                <div>
                                    <div className="header-container">
                                        <div className="total-med-created">
                                            <h3>Total Medical Record</h3>
                                            <h1>{totalMedical}</h1> {/* Foreground statistic for Total Medical Record*/}
                                            <h2>{totalMedical}</h2> {/* Background statistic for Total Medical Record*/}
                                        </div>
                                        <div className="date-time">
                                            <h3 className="timeToday">
                                                {dateState.toLocaleString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                })}</h3>
                                            <h3 className="dateToday">
                                                {dateState.toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}</h3>
                                        </div>
                                    </div>
                                    {/*Temporary back button*/}
                                    <Button type="primary" htmlType="submit" onClick={backClick}>
                                        Back
                                    </Button>
                                </div>
                }
            </Col>
        </Row>
    )
}

export default Default