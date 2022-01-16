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
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    },
    {
        name: "Analytics",
        icon: <BarChartOutlined />,
        redirect: "analytics",
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    },
    {
        name: "Medical Records",
        icon: <MedicineBoxOutlined />,
        redirect: "medical-records",
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    },
    {
        name: "Event Listing",
        icon: <CalendarOutlined />,
        redirect: "event-listing",
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    },
    {
        name: "Communication",
        icon: <MailOutlined />,
        redirect: "communication",
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
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
        ],
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    },
    {
        name: "Settings",
        icon: <SettingOutlined />,
        redirect: "settings",
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    },
    {
        name: "Sign out",
        icon: <LogoutOutlined />,
        redirect: "",
        roles: [
            "Barangay Chairman",
            "Barangay Nurse",
            "Medical Doctor"
        ]
    }
];

export default drawerNavigation;