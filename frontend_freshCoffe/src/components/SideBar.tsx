import CategoriaDetalles from "./categorias/CategoriaDetalles.tsx";
import {useQuery} from "@tanstack/react-query";
import {findAllCategoriasGET} from "../services/CategoriaService.ts";

const SideBar = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ["findAllCategorias"],
        queryFn: () => findAllCategoriasGET(),
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong.</div>;
    }


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
                    {data?.categorias.map((categoria) => (
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