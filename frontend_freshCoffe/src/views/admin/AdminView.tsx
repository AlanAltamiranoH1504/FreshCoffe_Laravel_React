// import {productos} from "../../data/Productos.ts";
import ProductoDetalles from "../../components/productos/ProductoDetalles.tsx";
import {useAppStore} from "../../store/useAppStore.tsx";
import Modal from "react-modal"
import ModalProducto from "../../components/productos/ModalProducto.tsx";
import {useEffect} from "react";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
Modal.setAppElement("#root");

const AdminView = () => {
    const {productos, getProductos, productosFiltrados, categoriaSeleccionada, statusModal} = useAppStore();

    useEffect(() => {
        getProductos();
    }, [getProductos]);

    return (
        <>
            <div className="mx-5">
                <h1 className="text-4xl font-fjalla mt-5">Productos Disponibles</h1>
                <p className="text-2xl my-10 font-fjalla">Elige y personaliza tu pedido a continuación</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {categoriaSeleccionada != 0 ? (
                        productosFiltrados.map((producto) => (
                            <ProductoDetalles producto={producto} key={producto.id}/>
                        ))
                    ) : (
                        productos.map((producto) => (
                            <ProductoDetalles producto={producto} key={producto.id}/>
                        ))
                    )}
                </div>
                {statusModal && (
                    <Modal
                        isOpen={statusModal}
                        style={customStyles}
                    >
                        <ModalProducto/>
                    </Modal>
                )}
            </div>
        </>
    );
}

export default AdminView;
