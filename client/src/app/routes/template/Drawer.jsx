import { 
    UserOutlined,
    BarChartOutlined,
    MedicineBoxOutlined,
    CalendarOutlined,
    MailOutlined,
    SettingOutlined,
    HomeOutlined
} from "@ant-design/icons";

const drawerNavigation = [
    {
        name: "Dashboard",
        icon: <HomeOutlined />,
        redirect: ""
    },
    {
        name: "Analytics",
        icon: <BarChartOutlined />,
        redirect: "analytics"
    },
    {
        name: "Medical Records",
        icon: <MedicineBoxOutlined />,
        redirect: "medical-records"
    },
    {
        name: "Event Listing",
        icon: <CalendarOutlined />,
        redirect: "event-listing"
    },
    {
        name: "Communication",
        icon: <MailOutlined />,
        redirect: "communication"
    },
    {
        name: "Users",
        icon: <UserOutlined />,
        childrens: [
            {
                name: "Create new user",
                component: "",
                redirect: "users"
            }
        ]
    },
    {
        name: "Settings",
        icon: <SettingOutlined />,
        redirect: "settings"
    },
];

export default drawerNavigation;