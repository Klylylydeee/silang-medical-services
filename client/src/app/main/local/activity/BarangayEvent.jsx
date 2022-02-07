import React from 'react'
import { useParams } from "react-router-dom";

const BarangayEvent = () => {
    const params = useParams();
    return (
        <div>
            Specific Event {params.barangay}-{params.id}
        </div>
    )
}

export default BarangayEvent
