import React from 'react'
import useCarrito from '../hooks/useCarrito'

const Alertacarrito = () => {

    const { mensajeagregado } = useCarrito();

  return (
    <>
        <div className={`${mensajeagregado ? 'card-check' : 'hidden'} rounded-xl p-3 gap-6 shadow-2xl`}>
            <div className='notification-body flex items-center p-1 gap-6'>
                <div className="div-check">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4E9F3D" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                </div>
                <p className="">Agregado correctamente </p>
            </div>
            <div className='notification-progress'></div>
        </div>
    </>
  )
}

export default Alertacarrito