import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterView from "./views/auth/RegisterView.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import AdminView from "./views/admin/AdminView.tsx";
import LoginView from "./views/auth/LoginView.tsx";
import CocinaView from "./views/cocina/CocinaView.tsx";
import CocinaLayout from "./layout/CocinaLayout.tsx";
import ProductosView from "./views/cocina/ProductosView.tsx";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/auth/login" element={<LoginView/>}></Route>
                        <Route path="/auth/registro" element={<RegisterView/>}></Route>
                    </Route>

                    <Route element={<AppLayout/>}>
                        <Route path="/administracion" element={<AdminView/>}></Route>
                    </Route>

                    <Route element={<CocinaLayout/>}>
                        <Route path="/cocina/ordenes" element={<CocinaView/>}></Route>
                        <Route path="/cocina/productos" element={<ProductosView/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;