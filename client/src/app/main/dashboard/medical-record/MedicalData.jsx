import React from "react";
import { useParams } from "react-router-dom";

const MedicalData = () => {
    const params = useParams();
    return (
        <div>
            {params.id}
        </div>
    )
};

export default MedicalData;
