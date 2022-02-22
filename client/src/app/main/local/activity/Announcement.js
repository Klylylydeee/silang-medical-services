import React from "react";
import './EventAnnouncement.css';
import { Card } from 'antd';




const Announcement = () => {
    

            return(

                    <div className="EventAnnouncement-body">
                        <div className="header-title">
                            <h1>Announcement</h1>
                        </div>

                        <div className="announcement-card">
                        <Card title="Announcement" bordered={false} style={{ width: "100%" }}>
                        
                        <div className="announcement-itemsRow">
                            <h2>
                                Announcement:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        
                        <div className="announcement-itemsRow">
                            <h2>
                                Description:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="announcement-itemsRow">
                            <h2>
                                Barangay:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="announcement-itemsRow">
                            <h2>
                                Requestor:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                            <div className="announcement-details">
                                <div className="announcement-details1">
                                    <div>
                                        first name: Lorem
                                    </div>
                                    <div>
                                        last name: Ipsum
                                    </div>
                                </div>
                                <div className="announcement-details2">
                                    <div>
                                        email: dolor
                                    </div>
                                    <div>
                                        phone number: 24
                                    </div>
                                </div>
                            </div>

                        <div className="announcement-itemsRow">
                            <h2>
                                Subscribed:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                            <div className="announcement-details">
                                <div className="announcement-details1">
                                    <div>
                                        first name: lorem
                                    </div>
                                    <div>
                                        last name: Ipsum
                                    </div>
                                </div>
                                <div className="announcement-details2">
                                    <div>
                                        email: dolor
                                    </div>
                                    <div>
                                        phone number: 24
                                    </div>
                                </div>
                            </div>

                        <div className="announcement-itemsRow">
                            <h2>
                                Approved-by: 
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="announcement-itemsRow">
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

export default Announcement
