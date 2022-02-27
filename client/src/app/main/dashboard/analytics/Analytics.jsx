import React from 'react'
import { useSelector } from "react-redux";

//Ant Design layout
import { Col, Layout, PageHeader } from 'antd';
import { Area } from '@ant-design/plots';

//Scss Styling
import '../../../../styles/analytics.scss'

function Analytics() {
  const { dimension } = useSelector((state) => state.web);
  const { barangay } = useSelector((state) => state.user); 

  const data = [
    {
      "year": "2009",
      "value": 2107,
      "category": "High"
    },
    {
      "year": "2009",
      "value": 2212,
      "category": "Medium"
    },
    {
      "year": "2009",
      "value": 146,
      "category": "Low"
    }, {
      "year": "2010",
      "value": 3107,
      "category": "High"
    },
    {
      "year": "2010",
      "value": 3812,
      "category": "Medium"
    },
    {
      "year": "2010",
      "value": 446,
      "category": "Low"
    },
    {
      "year": "2011",
      "value": 3134,
      "category": "High"
    },
    {
      "year": "2011",
      "value": 4055,
      "category": "Medium"
    },

    {
      "year": "2011",
      "value": 494,
      "category": "Low"
    },
    {
      "year": "2012",
      "value": 3200,
      "category": "High"
    },
    {
      "year": "2012",
      "value": 4106,
      "category": "Medium"
    },
    {
      "year": "2012",
      "value": 519,
      "category": "Low"
    },
    {
      "year": "2013",
      "value": 3920,
      "category": "High"
    },
    {
      "year": "2013",
      "value": 4926,
      "category": "Medium"
    },
    {
      "year": "2013",
      "value": 654,
      "category": "Low"
    },
    {
      "year": "2014",
      "value": 4280,
      "category": "High"
    },
    {
      "year": "2014",
      "value": 5117,
      "category": "Medium"
    },
    {
      "year": "2014",
      "value": 1368,
      "category": "Low"
    },
  ];


  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return (
    <Layout.Content>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }} className="analytics-container">
        <div style={{ backgroundColor: "#AD72B7", padding: "10px 20px", marginBottom: "15px", borderRadius: "5px" }}>
          <PageHeader
            ghost={false}
            title="Yearly Analytics"
            subTitle={dimension >= 4 ? `Contains the analytics for Barangay ${barangay}.` : ""}
            style={{ padding: 0, backgroundColor: "#AD72B7", borderRadius: "5px" }}
          />
        </div>
        <Area height={500} width={500} {...config} onReady={(plot) => {

          plot.on('axis-label:click', (data) => {
            console.log(data.gEvent.target.attrs.text);
          });
          // Plot adds click events to the entire chart area
          plot.on('plot:click', (...args) => {
            console.log(...args);
          });

          // Element to add a click event, element represents the graphic elements, graphical elements, please see: https://g2.antv.vision/en/docs/manual/concepts/element
          plot.on('element:click', (...args) => {
            console.log(...args);
          });

          // Legend adds click events
          plot.on('legend-item:click', (...args) => {
            console.log(...args);
          });

          // Legend name adds click event
          plot.on('legend-item-name:click', (...args) => {
            console.log(...args);
          });
          // Label adds click events
          plot.on('label:click', (...args) => {
            console.log(...args);
          });

          // Mask adds click events
          plot.on('mask:click', (...args) => {
            console.log(...args);
          });

          // Axis-label adds click events
          plot.on('axis-label:click', (...args) => {
            console.log(...args);
          });

          // Add click events to the annotation
          plot.on('annotation:click', (...args) => {
            console.log(...args);
          });
        }} loading={false} />
      </Col>
    </Layout.Content>
  )
}

export default Analytics
