import React from 'react';
import { useParams } from "react-router-dom";

const EventData = () => {
    const params = useParams();
    return (
        <div>
            {params.id}
        </div>
    );
};

export default EventData;
