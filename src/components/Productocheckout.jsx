import { useState, useEffect } from "react";
import useCarrito from "../hooks/useCarrito";

const Productocheckout = ({item}) => {

    const { carrito, setCarrito } = useCarrito();
    const [cantidad, setCantidad] = useState(item.cantidad);
    const [unidad, setUnidad] = useState(item.unidad);
    
    const subtotalinicial = (und, prec, bult) => {
        if (und === 'und'){
            return prec * Number.parseFloat(cantidad);
        } else {
            return (prec * 0.97 * bult * Number.parseFloat(cantidad))
        }
    }

    const [subtotal, setSubtotal] = useState(subtotalinicial(item.unidad, item.precio, item.bulto));

    useEffect(() => {

        //Nuevo subtotal
        let newsubtotal;
        if (unidad === 'und'){
            newsubtotal = item.precio * Number.parseFloat(cantidad);
        } else {
            newsubtotal = (item.precio * 0.97 * item.bulto * Number.parseFloat(cantidad))
        }
        setSubtotal(newsubtotal);

        //Guardar nueva cantidad en el carrito
        const newcarrito = carrito.map(pr => {
            if(pr.id === item.id){
                pr.cantidad = cantidad;
                return pr;
            }
            return pr;
        })

        setCarrito(newcarrito);


    }, [cantidad])


  return (
    <>
        <tr>
            <td className="nombre-pro td">{item.titulo}</td>
            <td className="td">
                <input className="cantidad-pro pro1 td" type="number" min="0" step="0.01" defaultValue={cantidad} onChange={(e) => setCantidad(e.target.value || 0)}/>
            </td>
            <td className='capitalize td'>{item.unidad}</td>
            <td className="subtotal-pro td">${subtotal.toLocaleString('es-CO')}</td>
        </tr>
    </>
  )
}

export default Productocheckout