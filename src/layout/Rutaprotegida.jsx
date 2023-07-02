import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";

const Rutaprotegida = () => {

    const { auth, cargando } = useAuth();

    if (cargando) return 'Cargandoo..'

  return (
    <>
        <Header />
        {auth?._id ? (
            <main className="contenedor">
                <Outlet />
            </main>
        ) : <Navigate to="/login" />}
        <Footer />
    </>
  )
}

export default Rutaprotegida