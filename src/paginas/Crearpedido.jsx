import useCarrito from '../hooks/useCarrito';
import Productocheckout from '../components/Productocheckout';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import clienteaxios from '../../config/axios';

const Crearpedido = () => {

  const { carrito, calculartotal, setCarrito } = useCarrito();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comentarios_cliente, setComentarios_cliente] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();


  const handlesubmit = async (e) => {
    e.preventDefault();
    
    if ([nombre, apellido, email, telefono, ciudad, direccion].includes('')){
      setAlerta({
        msg: 'Los campos Nombres, Apellidos, Email, Telefono, Ciudad y Direccion son obligatorios',
        error: true
      });
      return;
    }

    const pedido = {
      nombre: nombre,
      apellido: apellido,
      email,
      telefono,
      empresa,
      ciudad,
      direccion,
      items: carrito,
      total: calculartotal(),
      comentarios_cliente,
    }

    try {
      const url = '/pedidos/crear-pedido'
      const respuesta = await clienteaxios.post(url, pedido);
      setAlerta({msg: 'Creado correctamente, revisa tu email'})
      
      setTimeout(() => {
        setCarrito([]);
        navigate('/');
        
      }, 3000);
      
    } catch (error) {
      console.log(error);
    }

  }

  const { msg } = alerta;

  return (
    <>
      <div className="contenedor">
        <h2 className="uppercase">Finaliza tu pedido</h2>
        <form onSubmit={handlesubmit} className="finaliza-contenido">
          <div className="detalles">

            <h4 className="uppercase">Informacion del pedido</h4>

            <div className="nombres-apellidos doblecol">
              <div className="labels">
                  <label htmlFor="nombres">Nombres <span>*</span></label>
                  <input type="text" id="nombres" name="nombres" placeholder="Tus nombres" onChange={e => setNombre(e.target.value)}/>
              </div>
              
              <div className="labels">
                  <label htmlFor="apellidos">Apellidos <span>*</span></label>
                  <input type="text" id="apellidos" name="apellidos" placeholder="Tus apellidos" onChange={e => setApellido(e.target.value)}/>
              </div>
            </div>

            <div className="tel-email doblecol">
              <div className="labels">
                  <label htmlFor="telefono">Telefono <span>*</span></label>
                  <input type="tel" id="telefono" name="telefono" placeholder="Tu telefono" onChange={e => setTelefono(e.target.value)}/>
              </div>
              
              <div className="labels">
                  <label htmlFor="email">E-mail <span>*</span></label>
                  <input type="email" id="email" name="email" placeholder="Tu E-mail" onChange={e => setEmail(e.target.value)}/>
              </div>
            </div>

            <div className="nombre-empresa labels">
              <label htmlFor="empresa">Nombre de la empresa</label>
              <input type="text" name="empresa" id="empresa" placeholder="Nombre empresa" onChange={e => setEmpresa(e.target.value)}/>
            </div>
            <div className="pais-ciudad doblecol">
              <div className="labels">
                  <label htmlFor="pais">País <span>*</span></label>
                  <select name="pais" id="pais">
                      <option value="" disabled>Selecciona pais</option>
                      <option value="">Colombia</option>
                      <option value="">Argentina</option>
                      <option value="">Ecuador</option>
                  </select>
              </div>
              
              <div className="labels">
                  <label htmlFor="ciudad">Ciudad <span>*</span></label>
                  <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" onChange={e => setCiudad(e.target.value)}/>
              </div>
                
            </div>
            <div className="direccion labels">
              <label htmlFor="direccion">Dirección <span>*</span></label>
              <input type="text" id="direccion" name="direccion" placeholder="Dirección" onChange={e => setDireccion(e.target.value)}/>
            </div>
            <div className="commentarios labels">
              <label htmlFor="comentarios">Comentarios adicionales</label>
              <textarea id="comentarios" name="comentarios" onChange={e => setComentarios_cliente(e.target.value)}></textarea>
            </div>

          </div>

          <div className="checkout">
            <div className='flex justify-center gap-5'>
              <h4 className="uppercase">Tu pedido</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-truck-delivery" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                  <path d="M3 9l4 0" />
                </svg>
            </div>
            

            <table className='tabla-checkout'>
              <thead>
                  <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Unidad</th>
                      <th>Subtotal</th>
                  </tr>
              </thead>
              <tbody>
                {carrito.map(item => (
                  <Productocheckout 
                    key={item.id} 
                    item={item}
                  />   
                ))}
              </tbody>
            </table>
            
            <div className="contenido-subtotal total">
              <p className='font-bold'>Total</p>
              <p className="total-compra">${calculartotal().toLocaleString('es-CO')}</p>
            </div>
            {msg && <Alerta alerta={alerta}/>}
            <button type='submit' className={`${carrito.length > 0 ? 'block' : 'hidden'} boton-checkout p-8 uppercase font-bold w-full text-3xl rounded-2xl`}>Enviar pedido</button>
          </div>
          
        </form>
      </div>
    </>
  )
}

export default Crearpedido