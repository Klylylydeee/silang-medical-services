import React from "react";
import './BarangayEventList.css';
import logo from './barangay-lumil.png';
import { useState } from 'react';
import { Modal, Button, Collapse, Card, Form, Input, Select } from 'antd';

const { Option } = Select;
const formItemLayout = {};

const BarangayEventList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { Panel } = Collapse;

    function callback(key) {
        console.log(key);
        }

        const [form] = Form.useForm();
        const prefixSelector = (
          <Form.Item name="prefix" noStyle>
            <Select
              style={{
                width: 70,
              }}
            >
              <Option value="86">+63</Option>
              <Option value="87">+87</Option>
            </Select>
          </Form.Item>
        );
    
        

            return(

                    <div className="event-body">
                        <div className="event-header-title">
                            <div className="event-img">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div>
                                <h1>Puting Kahoy</h1>
                            </div>
                        </div>

                        <Modal title="Leave Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>The following are needed to be fill'ed to leave event</p>
                            <Form>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                    ]}
                                >
                                    <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                    />
                                </Form.Item>

                            </Form>
                        </Modal>

                        <div className="card-wrapper1">
                            <Card title="Event" bordered={false} style={{width:  "100%" }}>
                            
                            <Collapse className="c1" defaultActiveKey={['1']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Tuli sa Puting Kahoy" key="1">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>

                                    <div className="event-btn">
                                        <div className="attend-btn">
                                            <Button type="primary">
                                                Attend
                                            </Button>
                                        </div>
                                        <div className="leave-btn">
                                            <Button type="primary" onClick={showModal}>
                                                Leave
                                            </Button>
                                        </div>
                                    </div>
                                    
                                   
                                </Panel>
                            </Collapse>

                            <Collapse className="c1" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Bakuna sa Puting Kahoy" key="2">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>

                                    <div className="event-btn">
                                        <div className="attend-btn">
                                            <Button type="primary">
                                                Attend
                                            </Button>
                                        </div>
                                        <div className="leave-btn">
                                            <Button type="primary" onClick={showModal}>
                                                Leave
                                            </Button>
                                        </div>
                                    </div>

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

                                    <div className="event-btn">
                                        <div className="attend-btn">
                                            <Button type="primary">
                                                Attend
                                            </Button>
                                        </div>
                                        <div className="leave-btn">
                                            <Button type="primary" onClick={showModal}>
                                                Leave
                                            </Button>
                                        </div>
                                    </div>

                                </Panel>
                            </Collapse>

                            <Collapse className="c2" defaultActiveKey={['']} onChange={callback}>
                                <Panel  showArrow={false} header="Libreng Bakuna sa Puting Kahoy" key="2">
                                    <p> Lorem ipsum dolor sit amet. Id earum quia quo perspiciatis commodi sed cupiditate libero. Aut aperiam sunt sed quia consequatur qui numquam itaque vel quibusdam temporibus. In possimus nisi ut voluptatem accusantium id omnis consequatur qui fugiat aspernatur 33 totam galisum!</p>
                                    <Button type="link">See More...</Button>

                                    <div className="event-btn">
                                        <div className="attend-btn">
                                            <Button type="primary">
                                                Attend
                                            </Button>
                                        </div>
                                        <div className="leave-btn">
                                            <Button type="primary" onClick={showModal}>
                                                Leave
                                            </Button>
                                        </div>
                                    </div>

                                </Panel>
                            </Collapse>

                            </Card>
                        </div>

                </div>
            );
}

export default BarangayEventList
