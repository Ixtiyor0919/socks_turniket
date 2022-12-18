import { Drawer, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
import socks2 from "./socks2.png";

function DrapdownMenu({ onClose, isVisible }) {
    const { token } = useToken();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-token"))
            sessionStorage.removeItem("socks-token", token);
        if (localStorage.getItem("socks-token")) {
            localStorage.removeItem("socks-token", token);
        }
        window.location.href = "/login";
    };
    return (
        <Drawer
            placement="left"
            closable={false}
            size="200px"
            onClose={onClose}
            visible={isVisible}
        >
            <div
                className="logo"
                style={{
                    marginRight: "5%",
                    background: "rgb(0 21 41)",
                    padding: "15px 0 10px 15px",
                }}
            >
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={socks2}
                        alt="img-logo"
                        width={70}
                        height={40}
                        style={{ marginRight: "10%" }}
                    />
                    <h2 style={{ color: "#fff", margin: 0 }}>
                        Socks Turnstile
                    </h2>
                </Link>
            </div>
            <Menu
                style={{
                    height: "120%",
                }}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={["others"]}
                mode="inline"
                theme="dark"
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
                        key: "/Ishchilar",
                        icon: (
                            <Link to="/Ishchilar">
                                <TeamOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                    {
                        label: "Ish vaqtilari",
                        key: "/Ish-vaqtlari",
                        icon: (
                            <Link to="/Ish-vaqtlari">
                                <ClockCircleOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Oylar",
                        key: "/Oylar",
                        icon: (
                            <Link to="/Oylar">
                                <ScheduleOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    // {
                    //     label: "Profil",
                    //     key: "/profil",
                    //     icon: (
                    //         <Link to="/profil">
                    //             <UserOutlined style={{ fontSize: "18px" }} />
                    //         </Link>
                    //     ),
                    // },
                    // {
                    //     label: "Chiqish",
                    //     key: "/logout",
                    //     icon: (
                    //         <div type="link" onClick={(e) => handleLogOut(e)}>
                    //             <LogoutOutlined style={{ fontSize: "18px" }} />
                    //         </div>
                    //     ),
                    // },
                ]}
            />
        </Drawer>
    );
}

export default DrapdownMenu;
