import { Drawer, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    TeamOutlined,
    ClockCircleOutlined,
    ScheduleOutlined,
    DollarCircleOutlined,
    FileAddOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
import turniketLogo from "./turniketLogo.jpeg";

function DrapdownMenu({ onClose, isVisible }) {
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

    return (
        <Drawer
            placement="left"
            closable={false}
            size="200px"
            onClose={onClose}
            visible={isVisible}
            onKeyDown={onClose}
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
                        src={turniketLogo}
                        alt="img-logo"
                        width={70}
                        height={40}
                        style={{ marginRight: "10%", borderRadius: '5px' }}
                    />
                    <h2 style={{ color: "#fff", margin: 0 }}>
                        Turniket Admin
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
                onMouseDown={onClose}
                items={[
                    {
                        label: "Xodimlar",
                        key: "/",
                        icon: (
                            <Link to="/">
                                <TeamOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                    {
                        label: "Ish vaqti",
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
                        label: "Ish haqi",
                        key: "/Ish-haqilari",
                        icon: (
                            <Link to="/Ish-haqilari">
                                <DollarCircleOutlined 
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Avans",
                        key: "/Avans",
                        icon: (
                            <Link to="/Avans">
                                <ScheduleOutlined 
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Xarjatlar",
                        key: "/Ishchilar-xarajatlari",
                        icon: (
                            <Link to="/Ishchilar-xarajatlari">
                                <FileAddOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                ]}
            />
        </Drawer>
    );
}

export default DrapdownMenu;