import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserNotifications, getUserProfile } from "../apis/users";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { SetReloadNotifications } from "../redux/notifications";
import { Badge } from "antd";


function DefaultLayout({ children }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const {reloadNotifications, unreadNotifications} = useSelector((state) => state.notifications);
    const [collapsed, setCollapsed] = React.useState(false);
    const [menuToRender, setMenuToRender] = React.useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const userMenu = [
        {
            title: "Home",
            onclick: () => navigate("/"),
            icon: <i className="ri-home-7-line"></i>,
            path: "/",
        },
        {
            title: "Applied jobs",
            onclick: () => navigate("/applied-jobs"),
            icon: <i className="ri-file-list-3-line"></i>,
            path: "/applied-jobs",
        },
        {
            title: "Posted Jobs",
            onclick: () => navigate("/posted-jobs"),
            icon: <i className="ri-file-list-2-line"></i>,
            path: "/posted-jobs",
        },
        {
            title: "Profile",
            onclick: () => navigate(`/profile/${user.id}`),
            icon: <i className="ri-user-2-line"></i>,
            path: "/profile",
        },
        {
            title: "logout",
            onclick: () => {
                localStorage.removeItem("user");
                navigate("login");
            },
            icon: <i className="ri-logout-box-r-line"></i>,
            path: "/login",
        }];

    const adminMenu = [
        {
            title: "Home",
            onclick: () => navigate("/"),
            icon: <i className="ri-home-7-line"></i>,
            path: "/",
        },
        {
            title: "Jobs",
            onclick: () => navigate("/admin/jobs"),
            icon: <i className="ri-file-list-2-line"></i>,
            path: "/admin/jobs",
        },
        {
            title: "Users",
            onclick: () => navigate("/admin/users"),
            icon: <i className="ri-user-2-line"></i>,
            path: "/admin/users",
        },
        {
            title: "logout",
            onclick: () => {
                localStorage.removeItem("user");
                navigate("login");
            },
            icon: <i className="ri-logout-box-r-line"></i>,
            path: "/login",
        }
    ];

    const getData = async() => {
        try {
            dispatch(ShowLoading());
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await getUserProfile(userId);
            dispatch(HideLoading());
            if (response.data?.isAdmin === true) {
                setMenuToRender(adminMenu);
            } else {
                setMenuToRender(userMenu);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadNotifications = async () => {
        try {
            dispatch(ShowLoading());
            await getUserNotifications();
            dispatch(HideLoading());
            dispatch(SetReloadNotifications(false));
        } catch (error) {
            dispatch(HideLoading());
        }
    }

    useEffect(() => {
        getData();
    },[]);

    useEffect(() => {
        if(reloadNotifications) {
            loadNotifications();
        }
    }, [reloadNotifications])

    return (
        <div className="layout">
            <div className="sidebar justify-content-between flex">
                <div className="menu" style={{ width: collapsed ? "40px" : "150px", }}>
                    {menuToRender.map((item, index) => {
                        const isActive = window.location.pathname === item.path;
                        return (
                            <div className={`menu-item ${isActive && 'active-menu-item'}`}
                                onClick={item.onclick}
                                key={index}
                            >
                                {item.icon}
                                {!collapsed && <span>{item.title}</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="content">
                <div className="header justify-content-between d-flex">
                    <div className="d-flex items-center gap-2">
                        {collapsed && <i className="ri-menu-2-fill"
                            onClick={() => setCollapsed(!collapsed)}></i>}
                        {!collapsed && <i className="ri-close-line"
                            onClick={() => setCollapsed(!collapsed)}></i>}
                        <span className="logo">JobQuest</span>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                        <Badge count={unreadNotifications?.length || 0} className="mx-5"
                        onClick={() => navigate("/notifications")}>
                        <i className="ri-notification-line"></i>
                        </Badge>

                        
                        <span>{user?.name}</span>
                        <i className="ri-shield-user-line"></i>
                    </div>

                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout