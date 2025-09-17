import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore"
import ProductsDetailsCocina from "../../components/cocina/ProductsDetailsCocina";

export default function ProductosView() {
  const {getAllProducts, products} = useAppStore();
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  
  if(products) return (
    <>
        <div className="mx-5">
            <h1 className="text-4xl font-fjalla mt-5">Productos</h1>
            <p className="text-2xl my-10 font-fjalla">Administra los productos desde aqui y maneja su disponibilidad</p>
        
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductsDetailsCocina producto={product} key={product.id}/>
              ))}
            </div>
        </div>
    </>
  )
}
