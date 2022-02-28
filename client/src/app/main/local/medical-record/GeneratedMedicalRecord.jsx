import React from 'react'
import './GeneratedMedicalRecord.css';
import { Card } from 'antd';
import logo from './SHIS-logo.png';

const MedicalPDF = () => {
    
    return (
                <div className="GeneratedMedicalRecord-body">
                        <div className="header-title">
                            <div className="gen-header-img">
                                <img src={logo} alt="Logo" width="300" height="200"/>
                            </div>
                            <div className="gen-header-text">
                                <h1>Generated Medical Record</h1>
                            </div>
                            
                        </div>

                        <div className="recordList-card">
                        <Card title="Generated Medical Record details" bordered={false} style={{ width: "100%" }}>
                        
                        <div className="recordList-itemsRow">
                            <h2>
                                First Name:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        
                        <div className="recordList-itemsRow">
                            <h2>
                                Last Name:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="recordList-itemsRow">
                            <h2>
                                Email:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="recordList-itemsRow">
                            <h2>
                                Phone number:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        
                        <div className="recordList-itemsRow">
                            <h2>
                                Diagnosis:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="recordList-itemsRow">
                            <h2>
                                Detailed Report:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="recordList-itemsRow">
                            <h2>
                                Outlier:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        
                        <div className="recordList-itemsRow">
                            <h2>
                                Created By:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="recordList-itemsRow">
                            <h2>
                                Approved By:  
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>

                        <div className="recordList-itemsRow">
                            <h2>
                                Barangay:
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        
                        <div className="recordList-itemsRow">
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

export default MedicalPDF
