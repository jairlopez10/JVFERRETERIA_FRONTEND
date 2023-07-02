import { createContext, useState, useEffect } from "react";
import clienteaxios from "../../config/axios";
import useAuth from "../hooks/useAuth";

const Pedidoscontext = createContext();

const Pedidosprovider = ({children}) => {

    const [pedidos, setPedidos] = useState([]);
    const [pedido, setPedido] = useState({});
    const { auth } = useAuth();

    const editarpedido = (pedi) => {
        setPedido(pedi);
    }

    const eliminarpedido = async (id) => {

        try {
            const token = localStorage.getItem('tokenjvadmin');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteaxios.delete(`/pedidos/${id}`, config);

            const nuevospedidos = pedidos.filter(pedstate => pedstate._id !== id);
            setPedidos(nuevospedidos);
            
        } catch (error) {
            console.log(error);
        }

    }

    const actualizarpedido = async (nuevopedido) => {

        try {
            const token = localStorage.getItem('tokenjvadmin');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteaxios.put(`/pedidos/${nuevopedido.id}`, nuevopedido, config);
            
            const pedidosnuevos = pedidos.map(ped => {
                if (ped._id === data._id) {
                    return data
                }
                return ped;
            })
            setPedidos(pedidosnuevos);

        } catch (error) {
            console.log(error);
        }
        console.log(nuevopedido);
    }

    useEffect(() => {
        const obtenerpedidos = async () => {
            try {
                const token = localStorage.getItem('tokenjvadmin')
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteaxios('/pedidos', config)
                setPedidos(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerpedidos();
    }, [auth])
    
    return (
        <Pedidoscontext.Provider value={{
            pedidos, 
            setPedidos,
            editarpedido,
            pedido,
            setPedido,
            eliminarpedido,
            actualizarpedido
        }}>
            {children}
        </Pedidoscontext.Provider>
    )
}

export {
    Pedidosprovider
}

export default Pedidoscontext