import React from "react";
import './EventAnnouncement.css';
import { Card } from 'antd';
import logo from './barangay-lumil.png';



const EventListing = () => {
    

            return(

                <div className="EventAnnouncement-body">
                    <div className="listing-header-title">
                            <div className="listing-img">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div>
                                <h1>Event Listing</h1>
                            </div>
                        
                    </div>

                    <div className="event-card">
                        <Card title="Event" bordered={false} style={{ width: "100%" }}>
                        <div className="event-itemsRow">
                            <h2>
                                Event:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        
                        <div className="event-itemsRow">
                            <h2>
                                Description:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="event-itemsRow">
                            <h2>
                                Barangay:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="event-itemsRow">
                            <h2>
                                Requestor:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                            <div className="event-details">
                                <div className="event-details1">
                                    <div>
                                        first name: Lorem
                                    </div>
                                    <div>
                                        last name: Ipsum
                                    </div>
                                </div>
                                <div className="event-details2">
                                    <div>
                                        email: dolor
                                    </div>
                                    <div>
                                        phone number: 24
                                    </div>
                                </div>
                            </div>

                        <div className="event-itemsRow">
                            <h2>
                                Attendee:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                            <div className="event-details">
                                <div className="event-details1">
                                    <div>
                                        first name: lorem
                                    </div>
                                    <div>
                                        last name: Ipsum
                                    </div>
                                </div>
                                <div className="event-details2">
                                    <div>
                                        email: dolor
                                    </div>
                                    <div>
                                        phone number: 24
                                    </div>
                                </div>
                            </div>

                        <div className="event-itemsRow">
                            <h2>
                                Officials:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                            <div className="event-details">
                                <div className="event-details1">
                                    <div>
                                        first name: lorem
                                    </div>
                                    <div>
                                        last name: Ipsum
                                    </div>
                                </div>
                                <div className="event-details2">
                                    <div>
                                        email: dolor
                                    </div>
                                    <div>
                                        phone number: 24
                                    </div>
                                </div>
                            </div>

                        <div className="event-itemsRow">
                            <h2>
                                Start-datetime: 
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="event-itemsRow">
                            <h2>
                                End-datetime:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="event-itemsRow">
                            <h2>
                            Status:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        </Card>

                    </div>

                </div>
                
            );
}

export default EventListing
