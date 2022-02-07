import React from 'react'
import { FormattedMessage } from 'react-intl';
import { useParams } from "react-router-dom";

function AnalyticData() {
    const params = useParams();
    return (
        <div>
            analytics specific {params.year}-{params.month}
            <FormattedMessage id="greetings.user" defaultMessage="some default one" />
        </div>
    )
}

export default AnalyticData
