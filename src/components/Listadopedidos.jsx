import usePedidos from "../hooks/usePedidos"
import Pedido from "./Pedido";
import { useEffect } from "react";

const Listadopedidos = () => {

    const { pedidos, pedido } = usePedidos();

  return (
    <>
        {pedidos.length ? (
            <>
                <div className="listadopedidos">
                    <h3>Listado de pedidos</h3>
                    {pedidos.map(pedido => (
                        <Pedido 
                            key={pedido._id}
                            pedido={pedido}
                        />
                    ))}
                </div>
            </>
        ) : (
            <h3>No hay pedidos, aun</h3>
        )}
    </>
  )
}

export default Listadopedidos