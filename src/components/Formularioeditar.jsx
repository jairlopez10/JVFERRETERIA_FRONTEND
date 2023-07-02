import { useEffect, useState } from "react"
import usePedidos from "../hooks/usePedidos";
import Item from "./Item";
import Alerta from "./Alerta";

const Formularioeditar = () => {
    
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [email, setemail] = useState('');
    const [telefono, settelefono] = useState('');
    const [empresa, setempresa] = useState('');
    const [ciudad, setciudad] = useState('');
    const [direccion, setdireccion] = useState('');
    const [comentarios_cliente, setcomentarios_cliente] = useState('');
    const [id, setId] = useState('');
    const [comentarios_jv, setcomentarios_jv] = useState('');
    const [descuento, setdescuento] = useState('');
    const [items, setitems] = useState([]);
    const [status, setstatus] = useState('');
    const [alerta, setalerta] = useState({});

    const { pedido, actualizarpedido, setPedido } = usePedidos();

    useEffect(() => {
        if(pedido?.email){
            setnombre(pedido.nombre)
            setapellido(pedido.apellido)
            setemail(pedido.email)
            settelefono(pedido.telefono)
            setempresa(pedido.empresa)
            setciudad(pedido.ciudad)
            setdireccion(pedido.direccion)
            setcomentarios_cliente(pedido.comentarios_cliente)
            setstatus(pedido.status)
            setId(pedido._id);
            setitems(pedido.items);
            setcomentarios_jv(pedido.comentarios_jv)
        }
    }, [pedido])

    const handlesubmit = async (e) => {
        e.preventDefault();

        if([email, nombre, telefono, ciudad, direccion].includes('')){
            setalerta({msg: 'LOS CAMPOS EMAIL, NOMBRE, TELEFONO, CIUDAD Y DIRECCION SON OBLIGATORIOS', error: true});
            return;
        }

        const pedidoactualizado = {
            nombre,
            apellido,
            email,
            telefono,
            empresa,
            ciudad,
            direccion,
            comentarios_cliente,
            items,
            status,
            comentarios_jv,
            id
        }

        await actualizarpedido(pedidoactualizado);

        setnombre('')
        setapellido('')
        setemail('')
        settelefono('')
        setempresa('')
        setciudad('')
        setdireccion('')
        setcomentarios_cliente('')
        setstatus('')
        setId('');
        setitems([]);
        setPedido({});

    }

    const { msg } = alerta;

    return (
    <> 
        <div className="div-formulario-editar">
            <h3>Formulario Editar Pedidos</h3>
            <form onSubmit={handlesubmit} className="form-edit">
                <h4>Pedido #{id.slice(0,6)}</h4>
                <div className="flex justify-center">
                    <select className="statusselect" name="statusselect" id="statusselect" value={status} onChange={(e) => setstatus(e.target.value)}>
                        <option value="" disabled>Status</option>
                        <option className="bg-yellow-500" value="recibido">Recibido</option>
                        <option className="bg-blue-500" value="entregado">Entregado</option>
                        <option className="bg-green-500" value="pago">Pago</option>
                        <option className="bg-red-500" value="cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
                    <div className="client-info">
                        <label htmlFor="nombreedit">Nombre:</label>
                        <input type="text" id="nombreedit" value={nombre} onChange={e => setnombre(e.target.value)}/>
                    </div>
                    <div className="client-info">
                        <label htmlFor="apellidoedit">Apellido:</label>
                        <input type="text" id="apellidoedit" value={apellido} onChange={e => setapellido(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
                    <div className="client-info">
                        <label htmlFor="emailedit">Email:</label>
                        <input type="email" id="emailedit" value={email} onChange={e => setemail(e.target.value)}/>
                    </div>
                    <div className="client-info">
                        <label htmlFor="telefonoedit">Telefono:</label>
                        <input type="tel" id="telefonoedit" value={telefono} onChange={e => settelefono(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
                    <div className="client-info">
                        <label htmlFor="empresaedit">Empresa:</label>
                        <input type="text" id="empresaedit" value={empresa} onChange={e => setempresa(e.target.value)}/>
                    </div>
                    <div className="client-info">
                        <label htmlFor="ciudadedit">Ciudad:</label>
                        <input type="text" id="ciudadedit" value={ciudad} onChange={e => setciudad(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
                    <div className="client-info">
                        <label htmlFor="direccionedit">Dirección:</label>
                        <input type="text" id="direccionedit" value={direccion} onChange={e => setdireccion(e.target.value)}/>
                    </div>
                    <div className="client-info">
                        <label htmlFor="comentariosclienteedit">Comentarios Cliente:</label>
                        <textarea disabled id="comentariosclienteedit" value={comentarios_cliente} onChange={e => setcomentarios_cliente(e.target.value)}></textarea>
                    </div>
                </div>
                <p className="font-bold itemspedido">Items:</p>
                <div className=" mb-9">
                    {pedido?.email ? (
                        <>
                            {pedido.items.map(item => (
                            <Item 
                                key={item.id}
                                item={item}
                            />
                            ))}
                            <div className="mostrartotaleditar">
                                <p className="toti">Total: </p>
                                <p className="tot">${Number.parseFloat(pedido.total).toLocaleString('es-CO')}</p>
                            </div>
                            <div className="client-info">
                                <label htmlFor="comentariosjvedit">Comentarios J&V:</label>
                                <textarea id="comentariosjvedit" value={comentarios_jv} onChange={e => setcomentarios_jv(e.target.value)}></textarea>
                            </div>
                        </>
                    ): (
                        <p></p>
                    )}
                    
                </div>
                {msg && <Alerta alerta={alerta} />}
                <button type="submit" className={`${pedido.email ? 'block' : 'hidden'} boton-checkout p-8 uppercase font-bold w-full text-3xl rounded-2xl`}>Guardar Cambios</button>
                
            </form>
        </div>
        
    </>
  )
}

export default Formularioeditar