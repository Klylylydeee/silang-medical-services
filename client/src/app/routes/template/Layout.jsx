// Yarn packages
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Ant Design layout
import { Layout, Menu, Image, Breadcrumb, Affix, BackTop, Spin } from "antd";
import { UpOutlined } from '@ant-design/icons';
// import { MenuUnfoldOutlined, MenuFoldOutlined, } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";

// Reducers
import { signOut } from "src/app/store/user/userInformation";
import { revertDrawer, unauthorizeUser } from "src/app/store/web/webInformation";

import drawerNavigation from "src/app/routes/template/Drawer";

import { firstCharacterUppercase } from "src/app/helper/characters";

import silangMedicalLogo from "src/app/main/dashboard/sign-in/sign-in-assets/SHIS-logo.png"

function Dashboard() {
    // Enables redux reducer actions to be used
    const dispatch = useDispatch();
    // Redux slice variable/state
    const { first_name, last_name, designation } = useSelector((state) => state.user); 
    const { drawer, dimension, authorization, loading } = useSelector((state) => state.web); 
    // Ant design  deconstructed component
    const { SubMenu } = Menu;
    // eslint-disable-next-line
    const { Header, Sider, Content } = Layout;
    // Use to navigate within react router routes
    const history = useNavigate();
    const location = useLocation();

    const signOutRedux = () => {
        localStorage.removeItem("Authorization");
        dispatch(signOut());
        dispatch(unauthorizeUser());
        history("/");
    };

    useEffect(() => {
        dimension >= 5 ?
            dispatch(revertDrawer({ drawer: false }))
        :
            dispatch(revertDrawer({ drawer: true }));
    // eslint-disable-next-line
    }, [dimension]);

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={drawer}
            >
                <Affix offsetTop={0}>
                    <Image
                        src={silangMedicalLogo}
                        style={{
                            width: "60%",
                            padding: "10px 0"
                        }}
                        className="logoImage"
                    />
                    <Menu 
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={
                            [
                                `${firstCharacterUppercase(location.pathname.split("/").reduce((_prevVal, curVal) => {
                                    return curVal !== "Dashboard" ? curVal : "Dashboard"
                                }))}`
                            ]
                        }
                        defaultOpenKeys={["sub1"]}
                    >
                        {/* Side navigation buttons display */}
                        {
                            drawerNavigation.map((currNav, navKey) => {
                                return (
                                    <React.Fragment key={navKey}>
                                        {
                                            currNav.roles.some((currData) => {
                                                return currData === designation
                                            }) ?
                                                <React.Fragment>
                                                    {
                                                        currNav.childrens === undefined && currNav.name === "Sign out" ?
                                                            <Menu.Item key={currNav.name}  icon={currNav.icon} onClick={
                                                                // Logs out and de-authenticates all credentials of users in their browser
                                                                () => { 
                                                                    signOutRedux()
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
                                            :
                                                <React.Fragment>
                                                </React.Fragment>
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                    </Menu>
                </Affix>
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{ 
                        padding: "0 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        overflow: "hidden",
                    }}
                >
                    {
                        dimension >= 3 &&
                        <Breadcrumb>
                            {
                                location.pathname.split("/")[1] === "dashboard" && location.pathname.split("/").length === 2 ?
                                    <React.Fragment>
                                        <Breadcrumb.Item onClick={() => { history("/dashboard") }}>
                                            <HomeOutlined />
                                            <span>{firstCharacterUppercase(location.pathname.split("/")[1])}</span>
                                        </Breadcrumb.Item>
                                    </React.Fragment>
                                :
                                <React.Fragment>
                                    <Breadcrumb.Item href="/dashboard">
                                        <HomeOutlined />
                                        <span>{firstCharacterUppercase(location.pathname.split("/")[1])}</span>
                                    </Breadcrumb.Item>
                                    {
                                        location.pathname.split("/").map((currentPath, pathKey) => {
                                            return pathKey <= 0 || pathKey === 1 ?
                                                null
                                            :
                                                location.pathname.split("/").length-1 === pathKey ?
                                                <Breadcrumb.Item key={pathKey}>
                                                    {firstCharacterUppercase(currentPath)}
                                                </Breadcrumb.Item>
                                            :
                                                <Breadcrumb.Item key={pathKey}>
                                                    <span>
                                                        {
                                                            location.pathname.split("/").length >= 3 && dimension <= 2 ?
                                                                "..."
                                                            :
                                                                firstCharacterUppercase(currentPath)
                                                        }
                                                    </span>
                                                </Breadcrumb.Item>
                                        })
                                    }
                                </React.Fragment>
                            }
                        </Breadcrumb>
                    }
                    <div
                        style={{
                            lineHeight: "5px"
                        }}
                    >
                        <span className="c-pill c-pill--success">{first_name} {last_name} ({designation})</span>
                    </div>
                </Header>
                <Content style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: "1500px"}}>
                        <Spin tip="Loading..." spinning={authorization === false ? false : loading}>
                            <Outlet />
                        </Spin>
                    </div>
                </Content>
            </Layout>
            <BackTop>
                <div style={{
                    height: 40,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    backgroundColor: '#8C5C94',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 10,
                }}>
                    <UpOutlined />
                </div>
            </BackTop>
        </Layout>
    );
}

export default Dashboard;
