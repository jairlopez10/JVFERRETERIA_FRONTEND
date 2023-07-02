import { useContext } from "react";
import Pedidoscontext from "../context/Pedidosprovider";

const usePedidos = () => {
    return useContext(Pedidoscontext);
}

export default usePedidos;