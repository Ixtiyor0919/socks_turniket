import { Route, Routes } from "react-router-dom";
import LayoutMenu from "./Components/Layout/Layout";
import Error404 from "./Module/ErrorPages/Error404";
import Error500 from "./Module/ErrorPages/Error500";
import Turnstile from "./Turnstile/Turnstile";
import Login from "./Login/Login";
import Worker from "./Worker/Worker";

const RoutesPage = () => {
    return (
        <>
            <Routes>
                <Route element={<LayoutMenu />}>
                    <Route index element={<Turnstile />} />
                    <Route path="home" element={<Turnstile />} />
                    <Route path="worker" element={<Worker />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error404 />} />
                <Route path="server-error" element={<Error500 />} />
            </Routes>
        </>
    );
};

export default RoutesPage;
