// Yarn packages
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Ant Design layout
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, } from "@ant-design/icons";

// Reducers
import { revertDrawer } from "src/app/store/webApplicationConfiguration/webApplicationConfiguration";

import drawerNavigation from "src/app/routes/template/Drawer";

function Dashboard(child) {

    const dispatch = useDispatch();

    const { drawer } = useSelector((state) => state.webApp); 
    
    const { SubMenu } = Menu;
    const { Header, Sider, Content } = Layout;
    
    const history = useNavigate();

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={drawer}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]}>
                    {
                        drawerNavigation.map((currNav, navKey) => {
                            return (
                                <React.Fragment key={navKey}>

                                    {
                                        currNav.childrens === undefined ?
                                            <Menu.Item key={currNav.name}  icon={currNav.icon} onClick={
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
