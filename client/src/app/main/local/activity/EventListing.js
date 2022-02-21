import React from "react";
import './EventAnnouncement.css';



const EventListing = () => {
    

            return(

                <div className="EventAnnouncement-body">
                    <div className="header-title">
                        <h1>Event Listing</h1>
                    </div>

                    <div className="event-list">
                        <h2>
                            Event:
                        </h2>

                        <h2>
                            Description:
                        </h2>

                        <h2>
                            Barangay:
                        </h2>

                        <h2>
                            Requestor:
                        </h2>
                            <div>
                                first_name:
                            </div>
                            <div>
                                last_name:
                            </div>
                            <div>
                                email:
                            </div>
                            <div>
                                phone_number:
                            </div>
                            
                        
                        <h2>
                            Attendee:
                        </h2>
                        <div>
                                first_name:
                            </div>
                            <div>
                                last_name:
                            </div>
                            <div>
                                email:
                            </div>
                            <div>
                                phone_number:
                            </div>

                        <h2>
                            Officials:
                        </h2>
                        <div>
                                first_name:
                            </div>
                            <div>
                                last_name:
                            </div>
                            <div>
                                email:
                            </div>
                            <div>
                                phone_number:
                            </div>

                        <h2>
                            Start-datetime:
                        </h2>

                        <h2>
                            End_datetime:
                        </h2>

                        <h2>
                            Status:
                        </h2>
                    </div>

                </div>
                
            );
}

export default EventListing
