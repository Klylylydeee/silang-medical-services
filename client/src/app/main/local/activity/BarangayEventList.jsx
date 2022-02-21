import React from "react";
import './BarangayEventList.css';
import { Collapse } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';


const BarangayEventList = () => {
    const { Panel } = Collapse;

    function callback(key) {
        console.log(key);
        }

            return(

                    <div className="event-body">
                        <div className="header-title">
                            <h1>Puting Kahoy</h1>
                        </div>

                        <div className="card-wrapper1">
                            <Card title="Event" bordered={false} style={{width:  "100%" }}>
                            
                            <Collapse className="c1" defaultActiveKey={['1']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Tuli sa Puting Kahoy" key="1">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                    
                                </Panel>
                            </Collapse>

                            <Collapse className="c1" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Bakuna sa Puting Kahoy" key="2">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                </Panel>
                            </Collapse>


                            </Card>
                        </div>
                        

                        <div className="card-wrapper2">
                            <Card title="Announcement" bordered={false} style={{width:  "100%" }} >

                            <Collapse className="c2" defaultActiveKey={['1']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Tuli sa Puting Kahoy" key="1">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                </Panel>
                            </Collapse>

                            <Collapse className="c2" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Bakuna sa Puting Kahoy" key="2">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>
                                </Panel>
                            </Collapse>

                            </Card>
                        </div>

                </div>
            );
}

export default BarangayEventList
