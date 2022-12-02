import { Avatar, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
    DashboardOutlined,
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    TeamOutlined,
    DollarCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import useToken from "../../Hook/UseToken";
import DrapdownMenu from "../DrapdownMenu/DrapdownMenu";
import turnstileLogo from "./turnstileLogo.jpg";
import socksLogo from "./socksLogo.png";

const { Header } = Layout;

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { token } = useToken();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-turnstile-token"))
            sessionStorage.removeItem("socks-turnstile-token", token);
        if (localStorage.getItem("socks-turnstile-token")) {
            localStorage.removeItem("socks-turnstile-token", token);
        }
        window.location.href = "/login";
    };

    const showDrawer = () => {
        setIsVisible(true);
    };

    const onClose = () => {
        setIsVisible(false);
    };

    const menu = (
        <Menu
            items={[
                {
                    key: "/profil",
                    icon: <UserOutlined />,
                    label: (
                        <Link
                            to="/profil"
                            style={{ width: "100px", display: "inline-block" }}
                        >
                            Profil
                        </Link>
                    ),
                },
                {
                    key: "3",
                    danger: true,
                    icon: <LogoutOutlined />,
                    label: (
                        <div
                            onClick={(e) => handleLogOut(e)}
                            style={{ width: "100px" }}
                        >
                            Chiqish
                        </div>
                    ),
                },
            ]}
        />
    );

    return (
        <Header
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="logo" style={{ marginRight: "5%" }}>
                    <Link to="/" style={{ marginTop: "3px", display: "block" }}>
                        <img
                            src={socksLogo}
                            alt="img-logo"
                            width={70}
                            height={40}
                        />
                    </Link>
                </div>
                <Menu
                    style={{ width: "75%" }}
                    className="inline-navber"
                    theme="dark"
                    defaultSelectedKeys={[location.pathname]}
                    mode="horizontal"
                    items={[
                        {
                            label: "Bosh Sahifa",
                            key: "/",
                            icon: (
                                <Link to="/">
                                    <DashboardOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Ishchilar",
                            key: "/workers",
                            icon: (
                                <Link to="/workers">
                                    <TeamOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Ish vaqti",
                            key: "/working-times",
                            icon: (
                                <Link to="/working-times">
                                    <ClockCircleOutlined 
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Ish haqi",
                            key: "/salary",
                            icon: (
                                <Link to="/salary">
                                    <DollarCircleOutlined 
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                    ]}
                />
                <span
                    className="user inline-navber"
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Avatar
                            size="middle"
                            style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                            }}
                        >
                            {"Admin".charAt(0)}
                        </Avatar>
                    </Dropdown>
                </span>
                <div className="burger-menu">
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MenuOutlined
                            onClick={showDrawer}
                            rotate={180}
                            style={{ fontSize: "28px", color: "#fff" }}
                        />
                        <DrapdownMenu onClose={onClose} isVisible={isVisible} />
                    </span>
                </div>
            </div>
        </Header>
    );
}

export default Navbar;
