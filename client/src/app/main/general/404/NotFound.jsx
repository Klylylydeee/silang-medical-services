import React from 'react'
import { Empty } from "antd"

function NotFound() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <Empty description="404 Page not Found!"/> 
        </div>
    )
}

export default NotFound