import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteaxios from '../../config/axios';

const Nosotros = () => {

  const [nombre, setnombre] = useState('');
  const [email, setemail] = useState('');
  const [telefono, settelefono] = useState('');
  const [mensaje, setmensaje] = useState('');
  const [alerta, setalerta] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();

    if([nombre, email, mensaje].includes('')){
      setalerta({msg: 'El nombre, email y mensaje son obligatorios', error: true});
      return;
    }

    try {
      const { data } = await clienteaxios.post('/pedidos/contactanos', {nombre, email, telefono, mensaje})
      setalerta(data);

      setnombre('')
      setemail('')
      settelefono('')
      setmensaje('')
    } catch (error) {
      console.log(error);
    }

  }

  const { msg } = alerta;

  return (
    <>
      <div className="contenedor paginanos">
        <div className="div-nosotros">
          <h3>Nosotros</h3>
          <div className="nosotros">
            <div className="perfiles">
              <div className="perfil">
                <img className="perfilimagen" src="img/perfil.webp" alt="perfil" />
                <h4>Juan Valderrama</h4>
              </div>
              <div className="perfil">
                <img className="perfilimagen" src="img/perfil.webp" alt="perfil" />
                <h4>Jair López</h4>
              </div>
            </div>
            <p>¡Bienvenidos a nuestra página de ecommerce de ferretería, donde encontrarás todo lo que necesitas al por mayor y al detal! Somos dos egresados de la Pontificia Universidad Javeriana, apasionados por la construcción y comprometidos con brindarte una experiencia de compra conveniente y económica. 
            Ofrecemos una amplia variedad de productos de alta calidad para profesionales y aficionados. Nuestro catálogo incluye llaves de tubo, crucetas, calculadoras y entre otras mas, todo en un solo lugar. Además, tenemos una emocionante campaña de marketing: cada vez que alcanzamos 50 clientes nuevos, ofrecemos un increíble descuento del 50% en el pedido. Queremos premiar tu lealtad y celebrar cada hito contigo. Nuestro objetivo es brindarte productos de calidad, precios competitivos y un excelente servicio al cliente. Nuestro equipo está listo para ayudarte en todo momento.</p>
          </div>
        </div>
        <div className="div-contactanos">
          <div>
            <h3>Contactanos</h3>
            <form className="formnosotros" onSubmit={handlesubmit}>
              <div className="client-info">
                <label htmlFor="nombrecont">Nombre:</label>
                <input type="text" id="nombrecont" value={nombre} onChange={e => setnombre(e.target.value)} />
              </div>
              <div className="client-info">
                <label htmlFor="emailcont">Email:</label>
                <input type="email" id="emailcont" value={email} onChange={e => setemail(e.target.value)} />
              </div>
              <div className="client-info">
                <label htmlFor="celularcont">Celular:</label>
                <input type="tel" id="celularcont" value={telefono} onChange={e => settelefono(e.target.value)} />
              </div>
              <div className="client-info">
                <label htmlFor="mensajecont">Mensaje:</label>
                <textarea id="mensajecont" value={mensaje} onChange={e => setmensaje(e.target.value)}></textarea>
              </div>
              {msg && <Alerta alerta={alerta} />}
              <input type="submit" value="Enviar" className="botonnosotros" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nosotros