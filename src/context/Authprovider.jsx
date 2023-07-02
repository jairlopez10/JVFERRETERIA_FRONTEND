import { useState, useEffect, createContext } from "react";
import clienteaxios from "../../config/axios";

const Authcontext = createContext();

const Authprovider = ({children}) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});


    useEffect(() => {
        const autenticaradministrador = async () => {
            const token = localStorage.getItem('tokenjvadmin');

            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteaxios('/administrador/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);

        }
        autenticaradministrador();
    }, [])

    const cerrarsesion = () => {
        localStorage.removeItem('tokenjvadmin');
        setAuth({});
    }

    return (
        <Authcontext.Provider value={{
            auth,
            setAuth,
            cargando,
            setCargando,
            cerrarsesion
        }}>
            {children}
        </Authcontext.Provider>
    )
}

export {
    Authprovider
}

export default Authcontext