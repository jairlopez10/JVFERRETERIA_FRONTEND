import { useState, useEffect, createContext } from "react";

const Carritocontext = createContext();

const Carritoprovider = ({children}) => {

    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritojv')) || []);
    const [mensajeagregado, setMensajeagregado] = useState(false);

    useEffect(()=> {
        const newcarrito = JSON.stringify(carrito);
        localStorage.setItem('carritojv', newcarrito);
    }, [carrito]);

    const calculartotal = () => {
        let nuevototal = 0;
        carrito.forEach(item => {
            if (item.unidad === 'und'){
                nuevototal = nuevototal + (item.precio * item.cantidad)
            } else {
                nuevototal = nuevototal + (item.precio * 0.97 * item.bulto * item.cantidad);
            }
        })
        return nuevototal;
    }

    const agregaralcarrito = (producto) => {

        producto.cantidad = Number.parseFloat(producto.cantidad);

        const {id, cantidad, titulo, imagen, precio, unidad, bulto} = producto
        
        //Revisar si el producto ya esta en el carrito
        const existe = carrito.some(item => item.id === id);


        if (existe){
            const nuevocarrito = carrito.map(item => {
                
                //Encuentra el item en el carrito
                if (item.id === id){

                    //Revisa que tipo de unidad se recibe y calcula la cantidad final
                    if(unidad === 'und'){
                        if(item.unidad === 'und'){
                            if(Number.parseFloat(item.cantidad) + Number.parseFloat(cantidad) >= bulto && bulto > 0){
                                item.cantidad = (Number.parseFloat(item.cantidad) + Number.parseFloat(cantidad))/bulto
                                item.unidad = 'bulto';
                                item.cantidad = item.cantidad.toFixed(1);
                            } else {
                                item.cantidad = Number.parseFloat(item.cantidad) + Number.parseFloat(cantidad);
                                item.cantidad = item.cantidad.toFixed(1);
                            }
                        } else {
                            item.cantidad = Number.parseFloat(item.cantidad) + Number.parseFloat((Number.parseFloat(cantidad)/Number.parseFloat(bulto)).toFixed(1));
                        }
                    } else {
                        if (item.unidad === 'und'){
                            item.cantidad = Number.parseFloat(cantidad) + Number.parseFloat(item.cantidad)/bulto
                            item.unidad = 'bulto';
                            item.cantidad = item.cantidad.toFixed(1);
                        } else {
                            item.cantidad = Number.parseFloat(item.cantidad) + Number.parseFloat(cantidad);
                            item.cantidad = item.cantidad.toFixed(1);
                        }
                    }
                    item.cantidad = Number.parseFloat(item.cantidad);
                    return item
                }
                return item;
            })
            setCarrito(nuevocarrito);
        } else {

            //Si no se tiene una cantidad por bulto
            if (bulto === 0){
                
                const nuevocarrito = [...carrito, producto];
                setCarrito(nuevocarrito);
                return;
            }

            if (unidad === 'und'){
                //Cambia las unidades a bultos si aplica
                if(cantidad >= bulto){
                    producto.cantidad = (Number.parseFloat(cantidad) / Number.parseFloat(bulto)).toFixed(1);
                    producto.unidad = 'bulto';
                }
                else {
                    producto.cantidad = Number.parseFloat(producto.cantidad);
                }
            }

            const nuevocarrito = [...carrito, producto];
            setCarrito(nuevocarrito);
            
        }


        //Mensaje agregado correctamente
        setMensajeagregado(true);
        setTimeout(() => {
            setMensajeagregado(false);
        }, 3000);

    }

    const eliminardelcarrito = (id) => {

        const nuevocarrito = carrito.filter(item => {
            if(item.id !== id){
                return item;
            }
        })
        setCarrito(nuevocarrito);
    }

    const cambiarprecio = (tipo, precio, bulto) => {
        if(tipo === 'und'){
            return (precio).toLocaleString('es-CO');
        } else {
            return (precio * 0.97 * bulto).toLocaleString('es-CO');
        }
    }

    return (
        <Carritocontext.Provider value={{
            carrito,
            setCarrito,
            agregaralcarrito,
            eliminardelcarrito,
            cambiarprecio,
            mensajeagregado, 
            setMensajeagregado,
            calculartotal
        }}>
            {children}
        </Carritocontext.Provider>
    )
}

export {
    Carritoprovider
}

export default Carritocontext;