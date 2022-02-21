import { 
    UserOutlined,
    BarChartOutlined,
    MedicineBoxOutlined,
    CalendarOutlined,
    MailOutlined,
    SettingOutlined,
    HomeOutlined,
    LogoutOutlined
} from "@ant-design/icons";

const drawerNavigation = [
    {
        name: "Dashboard",
        icon: <HomeOutlined />,
        redirect: "",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Analytics",
        icon: <BarChartOutlined />,
        redirect: "analytics",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Records",
        icon: <MedicineBoxOutlined />,
        redirect: "medical-records",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Event Listing",
        icon: <CalendarOutlined />,
        redirect: "event-listing",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Communication",
        icon: <MailOutlined />,
        redirect: "communication",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Users",
        icon: <UserOutlined />,
        childrens: [
            {
                name: "Barangay users",
                component: "",
                redirect: "users"
            },
            {
                name: "Create new user",
                component: "",
                redirect: "users/create/invitation"
            }
        ],
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Settings",
        icon: <SettingOutlined />,
        redirect: "settings",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    },
    {
        name: "Sign out",
        icon: <LogoutOutlined />,
        redirect: "",
        roles: [
            "Chairman",
            "Nurse",
            "Doctor"
        ]
    }
];

export default drawerNavigation;