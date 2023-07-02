import { useParams } from "react-router-dom";
import productosdb from "../components/Productosdb";

const Producto = () => {

    const params = useParams()
    const idbuscar = Number.parseInt(params.id) 

    const producto = productosdb.find(item => item.id === idbuscar);

    const {id, titulo, precio, bulto, categoria, imagen} = producto;

  return (
    <div>Producto {titulo}</div>
  )
}

export default Producto