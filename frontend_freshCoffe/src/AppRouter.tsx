import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterView from "./views/auth/RegisterView.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import AdminView from "./views/admin/AdminView.tsx";
import LoginView from "./views/auth/LoginView.tsx";

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
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default AppRouter;