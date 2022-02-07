import React from 'react'
import { FormattedMessage } from 'react-intl';

function Setting() {
    return (
        <div>
            Setting
            <FormattedMessage id="greetings.user" defaultMessage="some default one" />
        </div>
    )
}

export default Setting;
