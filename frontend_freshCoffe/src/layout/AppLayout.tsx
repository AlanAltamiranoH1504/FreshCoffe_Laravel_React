import {Outlet} from "react-router-dom";
import SideBar from "../components/SideBar.tsx";
import Resumen from "../components/Resumen.tsx";

const AppLayout = () => {
    return (
        <>
            <div className="md:flex">
                <SideBar/>
                <main className="flex-1 h-screen overflow-y-scroll">
                    <Outlet/>
                </main>
                <Resumen/>
            </div>
        </>
    );
}
export default AppLayout;