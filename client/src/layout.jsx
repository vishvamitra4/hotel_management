import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function Layout() {

    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
};

export default Layout;