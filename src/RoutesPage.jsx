import { Route, Routes } from "react-router-dom";
import { useData } from "./Hook/UseData";
import LayoutMenu from "./Components/Layout/Layout";
import Error404 from "./Module/ErrorPages/Error404";
import Error500 from "./Module/ErrorPages/Error500";
import Loading from "./Components/Loading";
import BlockPage from "./Module/ErrorPages/BlockPage";
import Turnstile from "./Turnstile/Turnstile";
import Login from "./Login/Login";
import Worker from "./Worker/Worker";

const RoutesPage = () => {
    const { user, userLoading } = useData();

    if (user && userLoading) {
        return <Loading />;
    }

    return (
        <>
         {user?.block ? (
                <Routes>
                    <Route path="/" element={<BlockPage />} />
                </Routes>
            ) : (
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
                  )}
        </>
    );
};

export default RoutesPage;
