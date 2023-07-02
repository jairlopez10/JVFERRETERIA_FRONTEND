import useCarrito from "../hooks/useCarrito"
import { useState } from "react";

const Carrito = () => {

    const { carrito, eliminardelcarrito, cambiarprecio, mensajeagregado } = useCarrito();
    const [mostrarcarrito, setMostrarcarrito] = useState(false);

  return (
    <>
        <div className="submenu" >
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setMostrarcarrito(!mostrarcarrito)} className="carrito-svg cursor-pointer icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
            </svg>
            
            <div id="carrito" className={`${mostrarcarrito ? 'block' : 'hidden'} shadow-lg`}>
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            <th className="imagen-table font-bold text-2xl">Imagen</th>
                            <th className="font-bold text-2xl">Titulo</th>
                            <th className="font-bold text-2xl">Precio/Und o Bulto</th>
                            <th className="font-bold text-2xl">Cantidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map(producto => (
                            <tr key={producto.id}>
                                <td className="imagen-table"><img className="imagen-producto-carrito" src={producto.imagen} alt="imagenproducto"/></td>
                                <td className="text-xl">{producto.titulo}</td>
                                <td className="text-xl">${cambiarprecio(producto.unidad, producto.precio, producto.bulto)}</td>
                                <td className="text-xl capitalize">{producto.cantidad + ` ${producto.unidad}`}</td>
                                <td>
                                    <a className=" bg-red-500 px-3 py-2 text-lg rounded-full cursor-pointer" onClick={(e) => eliminardelcarrito(producto.id)}>X</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <a href="/crear-pedido" className="crear-pedido-carrito block text-center text-white p-7 uppercase text-xl rounded-2xl mt-5">Finalizar Pedido</a>
            </div>
        </div>
    </>
  )
}

export default Carrito