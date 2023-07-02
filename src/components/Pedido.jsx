import { useEffect, useState } from "react"
import usePedidos from "../hooks/usePedidos"

const Pedido = ({pedido}) => {

    const { nombre, apellido, fecha, total, status, _id} = pedido
    const [color, setColor] = useState('');

    const colores = {
        recibido: 'yellow',
        entregado: 'green',
        pago: 'blue',
        cancelado: 'red'
    }

    const { editarpedido, eliminarpedido } = usePedidos();

    const formatearfecha = (fecha) => {
        const nuevafecha = new Date(fecha);

        return new Intl.DateTimeFormat('es-CO', {dateStyle: 'long'}).format(nuevafecha);
    }

    useEffect(() => {
        setColor(colores[status]);
    }, [status])

    const capitalizeword = (word) => {
        return word.charAt(0).toUpperCase()+word.slice(1);
    }

    const handleeliminar = (id) => {

        const eliminado = confirm('Desea eliminar este pedido?'+id);
        
        if (!eliminado){
            return;
        }

        eliminarpedido(id);
    }


  return (
    <>
        <div className={`bg-${color}-500 divpedido`}>
            <p className="font-bold text-center">ID Pedido: <span className="font-normal">#{_id.slice(0,6)}</span></p>
            <div className="infopedidocard">
                <p className="font-bold">Cliente: <span className="font-normal">{nombre + ' ' + apellido}</span></p>
                <p className="font-bold">Fecha: <span className="font-normal">{formatearfecha(fecha)}</span></p>
            </div>
            <div className="infopedidocard">
                <p className="font-bold">Total: <span className="font-normal">${Number.parseFloat(total).toLocaleString('es-CO')}</span></p>
                <p className="font-bold">Status: <span className="font-normal">{capitalizeword(status)}</span></p>
            </div>
            <div className="flex mt-6 justify-between">
                <button className="boton-card-admin botoneditar" onClick={() => editarpedido(pedido)}>Editar</button>
                <button className="boton-card-admin bg-red-700 hover:bg-red-800 text-white" onClick={() => handleeliminar(pedido._id)}>Eliminar</button>
            </div>
        </div>
        
    </>
  )
}

export default Pedido