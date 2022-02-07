import React from 'react'
import { useParams } from "react-router-dom";

const MedicalPDF = () => {
    const params = useParams();
    return (
        <div>
            Specific PDF {params.barangay}-{params.id}
        </div>
    )
}

export default MedicalPDF
