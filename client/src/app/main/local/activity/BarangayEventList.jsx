import React from "react";
import { useParams } from "react-router-dom";

const BarangayEventList = () => {
    const params = useParams();
    return (
        <div>
            Events List {params.barangay}
        </div>
    )
}

export default BarangayEventList
