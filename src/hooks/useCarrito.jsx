import { useContext } from "react";
import Carritocontext from "../context/Carritoprovider";

const useCarrito = () => {
    return useContext(Carritocontext);
}

export default useCarrito;