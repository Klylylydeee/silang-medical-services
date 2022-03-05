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
            "Staff",
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
            "Staff"
        ]
    },
    {
        name: "Communication",
        icon: <MailOutlined />,
        redirect: "communication",
        roles: [
            "Chairman",
            "Staff"
        ]
    },
    {
        name: "Users",
        icon: <UserOutlined />,
        redirect: "users",
        // childrens: [
        //     {
        //         name: "Barangay users",
        //         component: "",
        //         redirect: "users"
        //     },
        //     {
        //         name: "Create new user",
        //         component: "",
        //         redirect: "users/create/invitation"
        //     }
        // ],
        roles: [
            "Chairman",
            "Staff"
        ]
    },
    {
        name: "Settings",
        icon: <SettingOutlined />,
        redirect: "setting",
        roles: [
            "Chairman",
            "Staff",
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
            "Staff",
            "Nurse",
            "Doctor"
        ]
    }
];

export default drawerNavigation;