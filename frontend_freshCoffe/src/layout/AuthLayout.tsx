import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className="max-w-4xl mx-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center ">
                <img src="/img/logo.svg" className="max-w-xs pl-4" alt="Logo de FreshCoffe"/>
                <div className="p-10 w-full">
                    <Outlet/>
                </div>
            </main>
        </>
    );
}
export default AuthLayout;