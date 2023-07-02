import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecommercelayout from "./layout/Ecommercelayout";
import Administrarpedidos from "./paginas/Administrarpedidos";
import Ecommerce from "./paginas/Ecommerce";
import Nosotros from "./paginas/Nosotros";
import Crearpedido from "./paginas/Crearpedido";
import Productos from "./paginas/Productos";
import Producto from "./paginas/Producto";
import Login from "./paginas/Login";
import { Carritoprovider } from "./context/Carritoprovider";
import { Authprovider } from "./context/Authprovider";
import { Pedidosprovider } from "./context/Pedidosprovider";
import Rutaprotegida from "./layout/Rutaprotegida";

function App() {

  return(
    <BrowserRouter>
      <Authprovider>
        <Pedidosprovider>
          <Carritoprovider>
            <Routes>
                <Route path="/" element={<Ecommercelayout />}>
                  <Route index element={<Ecommerce />} />
                  <Route path="/:id" element={<Producto />}/>
                  <Route path="nosotros" element={<Nosotros />} />
                  <Route path="crear-pedido" element={<Crearpedido />}/>
                  <Route path="login" element={<Login />}/>
                  <Route path="productos" element={<Productos />} />
                </Route>
                <Route path="/admin" element={<Rutaprotegida />}>
                  <Route index element={<Administrarpedidos />}/>
                </Route>
              </Routes>
          </Carritoprovider>
        </Pedidosprovider>
      </Authprovider>
    </BrowserRouter>
    
  )
}

export default App
