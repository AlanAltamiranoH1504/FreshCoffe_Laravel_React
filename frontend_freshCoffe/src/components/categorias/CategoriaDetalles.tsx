import type {Categoria} from "../../types";

type CategoriaDetallesProps = {
    categoria: Categoria
}
const CategoriaDetalles = ({categoria}: CategoriaDetallesProps) => {
    return (
        <>
            <div className="flex items-center gap-4 border w-full p-3 hover:bg-amber-500 cursor-pointer font-fjalla uppercase">
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