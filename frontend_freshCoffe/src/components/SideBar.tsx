import {categorias} from "../data/Categorias.ts";
import CategoriaDetalles from "./categorias/CategoriaDetalles.tsx";

const SideBar = () => {
    return (
        <>
            <aside className="md:w-72">
                <div className="p-4">
                    <img
                        src="/img/logo.svg"
                        className="w-40"
                    />
                </div>

                <div className="mt-10">
                    {/*TODO: Hacer render de categoias segun consulta abstract base de datos*/}
                    {categorias.map((categoria) => (
                        <CategoriaDetalles
                            key={categoria.id}
                            categoria={categoria}
                        />
                    ))}
                </div>
                <div className="my-5 p-5">
                    <button
                        type="button"
                        className="w-full border p-2 bg-amber-950 hover:bg-amber-800 transition-colors duration-500 cursor-pointer rounded-lg text-white uppercase font-fjalla"
                    >Cancelar Orden</button>
                </div>
            </aside>
        </>
    );
}
export default SideBar;