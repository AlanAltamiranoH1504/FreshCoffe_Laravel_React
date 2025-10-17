import {Outlet, useNavigate} from "react-router-dom";
import SideBar from "../components/SideBar.tsx";
import Resumen from "../components/Resumen.tsx";
import { useQuery } from "@tanstack/react-query";
import {userInSessionGET } from "../services/UsuarioService.ts";

const AppLayout = () => {
    // const navigate = useNavigate();
    // const {data, isLoading, isError} = useQuery({
    //     queryKey: ["findUserInSession"],
    //     queryFn: () => userInSessionGET(),
    //     retry: false,
    //     refetchOnWindowFocus: false
    // });

    // if(isLoading) {
    //     return <div>Cargando...</div>
    // }

    // if (isError) {
    //     navigate("/auth/login");
    // }
    
    
    
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