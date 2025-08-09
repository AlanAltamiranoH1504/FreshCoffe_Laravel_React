import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <h2>App Layout</h2>
            <Outlet/>
        </>
    );
}
export default AppLayout;