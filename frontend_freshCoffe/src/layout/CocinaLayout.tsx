import { Outlet } from "react-router-dom";
import SideBarCocina from "../components/SideBarCocina";

export default function CocinaLayout() {
  return (
    <>
        <div className="md:flex">
                <SideBarCocina/>
                <main className="flex-1 h-screen overflow-y-scroll bg-gray-200">
                    <Outlet/>
                </main>
            </div>
    </>
  )
}
