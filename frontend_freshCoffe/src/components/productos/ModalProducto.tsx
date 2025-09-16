import {useAppStore} from "../../store/useAppStore.tsx";
import {formatoMoneda} from "../../utils";
import {useForm} from "react-hook-form";
import type {FormSaveProductoToOrden, ProductoToAddInOrden} from "../../types";
import {toast} from "react-toastify";

const ModalProducto = () => {
    const {productoSeleccionado, showModal, addProductoInOrden} = useAppStore();
    const {register, handleSubmit, formState: {errors}} = useForm<FormSaveProductoToOrden>();
    function addProductoToOrden(data: FormSaveProductoToOrden) {
        const productoToAddInOrden: ProductoToAddInOrden = {
            id: productoSeleccionado!.id,
            nombre: productoSeleccionado!.nombre,
            imagen: productoSeleccionado!.imagen,
            precio: productoSeleccionado!.precio,
            categoria_id: productoSeleccionado!.categoria_id,
            cantidad: Number(data.cantidad),
            total: (productoSeleccionado!.precio * data.cantidad)
        }
        addProductoInOrden(productoToAddInOrden);
        toast.success("Producto agregado a la orden!");
    }

    if (productoSeleccionado) return (
        <>
            <div className="md:flex gap-10">
                <div className="md:w-1/3">
                    <img
                        alt={`${productoSeleccionado?.nombre}`}
                        src={`./img/${productoSeleccionado?.imagen}.jpg`}
                    />
                </div>
                <div className="md:w-2/3">
                    <div className="flex justify-end">
                        <button type="button" onClick={() => {
                            showModal();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <form className="space-y-3"
                            onSubmit={handleSubmit(addProductoToOrden)}
                        >
                            <h1 className="text-3xl font-fjalla text-center mt-5">{productoSeleccionado?.nombre}</h1>
                            <p className="mt-5 font-fjalla text-amber-500 text-3xl text-center">{formatoMoneda(productoSeleccionado?.precio)}</p>
                            <input
                                type="number"
                                className="w-full p-2 rounded-lg border-2"
                                placeholder={"Cantidad"}
                                {...register("cantidad", {
                                    required: "La cantidad es obligatoria",
                                    min: {
                                        value: 1,
                                        message: "La cantidad minima es de una unidad"
                                    },
                                    max: {
                                        value: 7,
                                        message: "La cantidad maxima es de 7 unidades"
                                    }
                                })}
                            />
                            <div className="bg-red-100 text-center rounded-md font-fjalla mt-1 text-red-600">
                                {errors.cantidad && String(errors.cantidad.message)}
                            </div>
                            <button
                                className="w-full p-2 rounded-lg bg-amber-950 hover:bg-amber-800 text-white text-xl transition-colors duration-500 font-fjalla my-5 uppercase">Agregar
                                a Orden
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ModalProducto;