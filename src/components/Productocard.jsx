import { useState, useEffect } from "react"
import useCarrito from "../hooks/useCarrito";

const Productocard = ({producto}) => {

    const {agregaralcarrito, cambiarprecio} = useCarrito();

    const { precio, titulo, imagen, id, bulto } = producto
    const [unidad, setUnidad] = useState('und');
    const [cantidad, setCantidad] = useState(1);

    const cambiodeunidad = (e, item) => {
        setUnidad(e.target.value);
    }

    //Redirecciona a la pagina del producto, NO SE ESTA UTILIZANDO, AGREGAR EL EVENTO ONCLICK EN LA IMAGEN Y TITULO
    const informacionproducto = (e, id) => {
        window.location.href = `/${id}`;
    }

    return (
        <>
            <div className="card-producto flex flex-col justify-evenly shadow-xl rounded-2xl p-5 ">
                <div className="div-imagen-producto">
                    <img src={imagen} alt="imagen" className="imagen-producto cursor-pointer" />
                    
                </div>
                
                <p className="titulo-producto text-center p-1 mt-3 mb-2 font-bold cursor-pointer" >{titulo}</p>
                <div className="flex justify-center mt-2 mb-4">
                    <p className="precio-producto">${cambiarprecio(unidad, precio, bulto)} / </p>
                    <select name={"unidad-"+id} id={"unidad-"+id} className=" text-xl cursor-pointer font-bold" onChange={e => cambiodeunidad(e, producto)}>
                        <option value="und">Unidad</option>
                        
                        <option className={`${bulto > 0 ? 'block' : 'hidden'}`} value="bulto">Bulto</option>
                    </select>
                </div>

                <p className={`${unidad === 'bulto' ? 'block' : 'hidden'} text-2xl text-center  mb-4`}>Bulto x {bulto} unidades</p>
                <button className="boton-informacion py-4 px-3 rounded-xl uppercase font-bold text-2xl mt-1" onClick={e => informacionproducto(e, id)}>Ver mas informacion</button>
                
                <div className="seccion-carrito mt-5">
                    <input type="number" min='1' className="cantidad-producto" defaultValue='1' name={"cantidad"+id} onChange={e => setCantidad(e.target.value)}/>
                    <p className="text-2xl text-center">{unidad === 'bulto' ? `Bulto` : "Unidad"}</p>
                    <div className="div-agregarcarrito ml-5 flex justify-center rounded-xl px-6 cursor-pointer" onClick={() => agregaralcarrito({id, cantidad, titulo, imagen, precio, unidad, bulto})}>  
                        <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-shopping-cart-plus" width="42" height="42" viewBox="0 0 24 24" strokeWidth="1.3" stroke="#1a1a1a" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13" />
                            <path d="M15 6h6m-3 -3v6" />
                        </svg>
                    </div> 
                </div>
                
                
            </div>
            
        </>
        
    )
}

export default Productocard