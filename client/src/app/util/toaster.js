import { message } from 'antd';

const toasterRequest = ({ payloadType, textString }) => {
    
    message.config({
        maxCount: 1,
        duration: 5
    });

    switch(payloadType){
        case "info":
            message.info(`${textString}`);
            break;
        case "success":
            message.success(`${textString}`);
            break;
        case "error":
            message.error (`${textString}`);
            break;
        case "warning":
            message.warning(`${textString}`);
            break;
        default:
            message.info(`${textString}`);
    }
};

export default toasterRequest;