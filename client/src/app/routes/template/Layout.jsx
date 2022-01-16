// Yarn packages
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Ant Design layout
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, } from "@ant-design/icons";

// Reducers
import { revertDrawer } from "src/app/store/webApplicationConfiguration/webApplicationConfiguration";

import drawerNavigation from "src/app/routes/template/Drawer";

import { firstCharacterUppercase } from "src/app/helper/characters";

function Dashboard(child) {
    // Enables redux reducer actions to be used
    const dispatch = useDispatch();
    // Redux slice variable/state
    const { drawer } = useSelector((state) => state.webApp); 
    // Ant design  deconstructed component
    const { SubMenu } = Menu;
    // eslint-disable-next-line
    const { Header, Sider, Content } = Layout;
    // Use to navigate within react router routes
    const history = useNavigate();
    const location = useLocation();

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={drawer}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${
                    firstCharacterUppercase(location.pathname.split("/").reduce((_prevVal, curVal) => {
                        return curVal !== "Dashboard" ? curVal : "Dashboard"
                    }))
                }`]} defaultOpenKeys={["sub1"]}>
                    {/* Side navigation buttons display */}
                    {
                        drawerNavigation.map((currNav, navKey) => {
                            return (
                                <React.Fragment key={navKey}>

                                    {
                                        currNav.childrens === undefined && currNav.name === "Sign out" ?
                                            <Menu.Item key={currNav.name}  icon={currNav.icon} onClick={
                                                // Logs out and de-authenticates all credentials of users in their browser
                                                () => { 
                                                    
                                                 }
                                            }>
                                                {currNav.name}    
                                            </Menu.Item>
                                        :
                                        currNav.childrens === undefined?
                                            <Menu.Item key={currNav.name}  icon={currNav.icon} onClick={
                                                // Redirect users to the their routes
                                                () => { history(currNav.redirect) }
                                            }>
                                                {currNav.name}    
                                            </Menu.Item>
                                        :
                                            <SubMenu key={currNav.name} title={currNav.name} icon={currNav.icon}>
                                                {
                                                    currNav.childrens.map((navChild, childKey) => {
                                                        return (
                                                            <React.Fragment key={childKey}>
                                                                <Menu.Item key={navChild.name} onClick={() => {
                                                                    history(navChild.redirect)
                                                                }}>
                                                                    {navChild.name} 
                                                                </Menu.Item>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                >
                    {
                        drawer === true ? (
                            <MenuFoldOutlined
                                onClick={() => {
                                    dispatch(revertDrawer())
                                }}
                            />
                        ) : (
                            <MenuUnfoldOutlined
                                onClick={() => {
                                    dispatch(revertDrawer())
                                }}
                            />
                        )
                    }
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
}

export default Dashboard;
