import React from 'react'
import { useSearchParams } from "react-router-dom";

const MedicalRecordList = () => {
    const [ searchParams ] = useSearchParams();
    return (
        <div>
            Specific Event {searchParams.get("barangay")}-{searchParams.get("email")}
        </div>
    )
}

export default MedicalRecordList
