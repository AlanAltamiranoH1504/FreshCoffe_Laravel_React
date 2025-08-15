import type {Categoria} from "../../types";
import {useAppStore} from "../../store/useAppStore.tsx";

type CategoriaDetallesProps = {
    categoria: Categoria
}
const CategoriaDetalles = ({categoria}: CategoriaDetallesProps) => {
    const {addCategoria, categoriaSeleccionada} = useAppStore();
    return (
        <>
            <div
                onClick={() => {
                    addCategoria(categoria.id);
                }}
                // flex items-center gap-4 border w-full p-3 hover:bg-amber-500 cursor-pointer font-fjalla uppercase
                className={categoria.id === categoriaSeleccionada ? ("flex items-center gap-4 border w-full p-3 bg-amber-950 text-white cursor-pointer font-black uppercase"): ("flex items-center gap-4 border w-full p-3 hover:bg-amber-500 cursor-pointer font-fjalla uppercase")}>
                <img
                    src={`/img/icono_${categoria.icono}.svg`}
                    alt="Icono de categoria"
                    className="w-12"
                />
                <p className="font-borel cursor-pointer truncate text-lg">{categoria.nombre}</p>
            </div>
        </>
    );
}
export default CategoriaDetalles;