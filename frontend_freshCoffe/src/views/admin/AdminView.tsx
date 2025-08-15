import {productos} from "../../data/Productos.ts";
import ProductoDetalles from "../../components/productos/ProductoDetalles.tsx";
const AdminView = () => {
    return (
        <>
            <div className="mx-5">
                <h1 className="text-4xl font-fjalla mt-5">Productos Disponibles</h1>
                <p className="text-2xl my-10 font-fjalla">Elige y personaliza tu pedido a continuación</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {productos.map((producto) => (
                        <ProductoDetalles
                            producto={producto}
                            key={producto.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
export default AdminView;