import { useState, useEffect } from "react"

const Item = ({item}) => {

    const { imagen } = item;

    const [cantidad, setcantidad] = useState(item.cantidad);
    const [unidad, setunidad] = useState(item.unidad);

    const [subtotal, setsubtotal] = useState('');

    useEffect(() => {
        if (unidad === 'und'){
            setsubtotal(cantidad*item.precio);
        } else {
            setsubtotal(item.precio * 0.97 * item.bulto * item.cantidad);
        }
    }, [])


  return (
    <>
        <div className="itemdiv flex p-2">
            <div className="bg-white rounded-2xl imag">
                <img src={imagen} alt="" />
            </div>
            <div className=" mx-3 itemdivdiv">
                <p className="titu font-bold">{item.titulo}</p>
                <div className="itemcanpre">
                    <div className="divsubitem">
                        <p className="text-center">Cantidad</p>
                        <input className="cantidad" name="cant" type="number" value={cantidad} disabled onChange={(e) => setcantidad(e.target.value)} />
                    </div>
                    <div className="divsubitem">
                        <p className="text-center">Unidad</p>
                        <select name="" id={item.id} disabled className="unidad" value={unidad} onChange={(e) => setunidad(e.target.value)}>
                            <option value="und">Unidad</option>
                            <option value="bulto">Bulto</option>
                        </select>
                    </div>
                    
                </div>
                <div className="divsubitem ml-4">
                    <p className="text-center">Subtotal</p>
                    <input disabled type="number" name="subtotal" value={subtotal} onChange={e => setsubtotal(e.target.value)} />
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Item