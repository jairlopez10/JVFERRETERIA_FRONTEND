import { Link } from "react-router-dom"
import { useState } from "react";
import Carrito from "./Carrito";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const [menu, setMenu] = useState(false);
  const { auth, cerrarsesion } = useAuth();

  return (
    <>
      <header className="header mb-4">
        
        <nav className="contenedor flex flex-col justify-between items-center md:flex-col lg:flex-row">
          <div className="w-full flex justify-between">
            <Link to="/" className="font-bold p-3 md:w-full lg:w-auto text-center" onClick={() => setMenu(false)}>
             J&V Ecommerce
            </Link>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`${menu ? 'hidden' : 'block'} cursor-pointer md:hidden icon icon-tabler icon-tabler-menu-2`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setMenu(!menu)}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className={`${menu ? 'block' : 'hidden'} cursor-pointer md:hidden icon icon-tabler icon-tabler-x`} width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setMenu(!menu)}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          <div className={`${menu ? 'flex' : 'hidden'} md:flex mt-5 gap-3 font-bold items-center flex-col md:flex-row md:gap-28`}>
            <Link to="/" onClick={() => setMenu(false)}>Inicio</Link>
            <Link to="/nosotros" onClick={() => setMenu(false)}>Nosotros</Link>
            <Carrito />
            <Link className={`${auth?.email ? 'visible' : 'hidden'}`} to="/" onClick={cerrarsesion}>Cerrar Sesión</Link>
            
          </div>
        </nav>
        
        
      </header>
    </>
  )
}

export default Header