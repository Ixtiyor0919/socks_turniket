import { Drawer, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    DollarCircleOutlined,
    AppstoreAddOutlined,
    TeamOutlined,
    AppstoreOutlined,
    CloudSyncOutlined,
    CloudServerOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
import turnstileLogo from "./turnstileLogo.jpg";

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
              <div className="logo" style={{ marginRight: "5%" }}>
                    <Link to="/" style={{ marginTop: "3px", display: "block" }}>
                        <img
                            src={turnstileLogo}
                            alt="img-logo"
                            width={70}
                            height={40}
                        />
                        {/* Socks Turnstile */}
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
                        key: "/worker-times",
                        icon: (
                            <Link to="/worker-times">
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
                    {
                        label: "Profil",
                        key: "/profil",
                        icon: (
                            <Link to="/profil">
                                <UserOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                    {
                        label: "Chiqish",
                        key: "/logout",
                        icon: (
                            <div type="link" onClick={(e) => handleLogOut(e)}>
                                <LogoutOutlined style={{ fontSize: "18px" }} />
                            </div>
                        ),
                    },
                ]}
            />
        </Drawer>
    );
}

export default DrapdownMenu;
