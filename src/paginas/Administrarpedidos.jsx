import Formularioeditar from "../components/Formularioeditar"
import Listadopedidos from "../components/Listadopedidos"

const Administrarpedidos = () => {
  return (
    <>
      <div className="admingrid">
        <Formularioeditar />
        <Listadopedidos />
      </div>
    </>
  )
}

export default Administrarpedidos