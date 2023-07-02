import { useState, useEffect } from "react";
import Productocard from "../components/Productocard";
import productosdb from "../components/Productosdb";
import Anuncio from "../components/Anuncio";
import Alertacarrito from "../components/Alertacarrito";

const Ecommerce = () => {

  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState('');
  const [preciomin, setPreciomin] = useState('');
  const [preciomax, setPreciomax] = useState('');
  const [ordenar, setOrdenar] = useState('');
  const [productosfinal, setProductosfinal] = useState(productosdb);
  const [productosimprimir, setProductosimprimir] = useState(productosdb);
  const prodporpagina = 10;
  

  const colocarpaginador = () => {
    
    const numpaginas = Math.ceil(productosfinal.length/prodporpagina);

    let arraypaginas = [];

    for(let i = 1; i<=numpaginas; i++) {
      arraypaginas.push(i);
    }

    return arraypaginas;

  }
  

  const definirproductospagina = () => {

    let iteradormax = pagina * prodporpagina;
    const iteradormin = iteradormax - prodporpagina;

    if (productosfinal.length -1 < iteradormax){
      iteradormax = productosfinal.length;
    }

    let listaprod = [];

    for(let i=iteradormin; i<iteradormax ; i++){
      listaprod.push(productosfinal[i]);
    }

    setProductosimprimir(listaprod);

    colocarpaginador();
    
  }

  const filtrarcategoria = (product) => {
    if(categoria){
      return product.categoria === categoria
    }
    return product;
  }


  const filtrarpreciomin = (product) => {
    if(preciomin){
      return product.precio >= preciomin
    }
    return product;
  }

  const filtrarpreciomax = (product) => {
    if(preciomax){
      return product.precio <= preciomax
    }
    return product;
  }

  //Filtra y ordena los productos
  useEffect( () => {
    const productosfiltrados = productosdb.filter(filtrarcategoria).filter(filtrarpreciomin).filter(filtrarpreciomax);
    if(ordenar){
      if (ordenar === 'asc'){
        productosfiltrados.sort(((a,b) => a.precio - b.precio));
        
      } else {
        productosfiltrados.sort(((a,b) => b.precio - a.precio));
          
      }
    }
    setProductosfinal(productosfiltrados);
  }, [categoria, preciomin, preciomax, ordenar]);

  useEffect(() => {
    definirproductospagina();
  }, [productosfinal, pagina])
  

  return (
    <>
      <div className="contenedor">
        <Alertacarrito />
        <Anuncio />
        <div className="selectores mb-5">
          <select className="selector bg-yellow-400" name="categoria" id="categoria" onChange={e => {
            setCategoria(e.target.value);
            setPagina(1);
          }}>
            <option value="">{categoria === "" ? 'Categoria' : 'Todas las categorias'}</option>
            <option value="aceites">Aceites</option>
            <option value="alicates">Alicates</option>
            <option value="bisturis">Bisturis</option>
            <option value="calculadoras">Calculadoras</option>
            <option value="cautines">Cautines</option>
            <option value="cintas">Cintas</option>
            <option value="corta-frios">Corta frios</option>
            <option value="crucetas">Crucetas | Tricetas</option>
            <option value="destornillador">Destornillador</option>
            <option value="linternas">Linternas</option>
            <option value="llaves">Llaves</option>
            <option value="martillos">Martillos</option>
            <option value="metros">Metros</option>
            <option value="multitomas-extensiones">Multitomas | Extensiones</option>
            <option value="navajas">Navajas</option>
            <option value="pinzas">Pinzas y Pela cables</option>
            <option value="electronicos">Electronicos</option>
            <option value="otros">Otros</option>
          </select>
          <select className="selector bg-yellow-400" name="preciomin" id="preciomin" onClick={e => setPreciomin(e.target.value)}>
            <option value="">{preciomin === "" ? 'Precio minimo' : 'Todos los precios'}</option>
            <option value="10000">$10.000</option>
            <option value="20000">$20.000</option>
            <option value="30000">$30.000</option>
            <option value="50000">$50.000</option>
            <option value="90000">$90.000</option>
            <option value="110000">$110.000</option>
          </select>
          <select className="selector" name="preciomax" id="preciomax" onChange={e => setPreciomax(e.target.value)}>
            <option value="">{preciomax === "" ? 'Precio maximo' : 'Todos los precios'}</option>
            <option value="10000">$10.000</option>
            <option value="20000">$20.000</option>
            <option value="30000">$30.000</option>
            <option value="50000">$50.000</option>
            <option value="90000">$90.000</option>
            <option value="110000">$110.000</option>
            <option value="190000">$190.000</option>
          </select>
          <select className="selector bg-yellow-400" name="ordenar" id="ordenar" onChange={e => setOrdenar(e.target.value)}>
            <option value="">Ordenar - Precio</option>
            <option value="asc">Ordenar de menor a mayor</option>
            <option value="desc">Ordenar de mayor a menor</option>
          </select>
        </div>
        
        <div className="seccion-productos">
          {productosimprimir.map(producto => (
              <Productocard 
                  key={producto.id}
                  producto={producto}
              />
          ))}
        </div>
        <div className="divpaginador">
          {colocarpaginador().map(paginador => (
            <button className={`${paginador === 1 ? 'paginador-activo' : ''} paginador`} key={paginador} onClick={(e) => {
              setPagina(paginador);
              const categoriaselect = document.querySelector('#categoria').getBoundingClientRect().top
              window.scrollTo({
                top: categoriaselect,
                behavior: 'smooth'
              })
              //document.querySelector('#categoria').scrollIntoView({behavior: "smooth"});
              const selectores = document.querySelectorAll('.paginador');
              selectores.forEach(sel => sel.classList.remove('paginador-activo'))
              e.target.classList.add('paginador-activo');
            }}>{paginador}</button>
          ))}
        </div>
        
      </div>
      <div>
        <img className="wa" src="img/wa4.webp" alt="Whatsaap" onClick={() => {
          window.open('https://wa.me/573246767492?text=Hola%20Jair,%20estoy%20interesado%20en%20el%20catalogo!', '_blank');
        }}/>
      </div>
    </>
  )
}

export default Ecommerce