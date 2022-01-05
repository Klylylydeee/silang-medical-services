import React from 'react'
import { FormattedMessage } from 'react-intl';

function Analytics() {
    return (
        <div>
            This is a protected child route
            <FormattedMessage id="greetings.user" defaultMessage="some default one" />
        </div>
    )
}

export default Analytics
