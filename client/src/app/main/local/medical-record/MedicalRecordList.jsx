import React from 'react'
import './MedicalRecordList.css';
import { Collapse } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';
import logo from './SHIS-logo.png';

const MedicalRecordList = () => {
    const { Panel } = Collapse;

    function callback(key) {
        console.log(key);
        }

    return (
        <div className="medicalRecord-body">
                        <div className="medicalRecord-header-title">
                            <div className="header-img">
                                <img src={logo} alt="Logo" width="300" height="200"/>
                            </div>
                            <div className="header-text">
                                <h1>Puting Kahoy Medical Record</h1>
                            </div>
                            
                        </div>

                        <div className="medicalRecord-card-wrapper1">
                            <Card title="Medical Record List" bordered={false} style={{width:  "100%" }}>
                            
                            <Collapse className="c1" defaultActiveKey={['1']} onChange={callback}>
                                <Panel  showArrow={false} header="Medical Record ----------" key="1">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                    
                                </Panel>
                            </Collapse>

                            <Collapse className="c1" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Medical Record ---------------" key="2">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                </Panel>
                            </Collapse>

                            <Collapse className="c1" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Medical Record --------------------" key="1">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                    
                                </Panel>
                            </Collapse>

                            <Collapse className="c1" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Medical Record -------------------------" key="2">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                </Panel>
                            </Collapse>


                            </Card>
                        </div>
                        

                        

                </div>
            );
}

export default MedicalRecordList
