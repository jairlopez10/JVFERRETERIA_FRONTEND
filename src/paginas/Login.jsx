import { useState } from "react"
import useAuth from '../hooks/useAuth';
import Alerta from "../components/Alerta";
import clienteaxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        if([email, password].includes('')){
            setAlerta({
                msg: 'Email y Password son obligatorios',
                error: true
            })
            return;
        }

        if(password.length < 6) {
            setAlerta({
                msg: 'Password debe ser mayor de 6 caracteres',
                error: true
            })
            return;
        }

        try {
            const { data } = await clienteaxios.post('/administrador/login', {email, password});
            localStorage.setItem('tokenjvadmin', data.token);
            setAuth(data);
            navigate('/admin');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            return;
        }
        
    }

    const { msg } = alerta

    return (
    <>      
        <h2 className="font-bold">Inicia Sesión</h2>
        <div className="div-form">
            
            <form onSubmit={handlesubmit} className="form-login">
                {msg && <Alerta alerta={alerta}/>}
                <div>
                    <div className="preg">
                        <label htmlFor="email-admin">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value) } id="email-admin" />
                    </div>
                    <div className="preg mt-4">
                        <label htmlFor="password-admin">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} id="password-admin" />
                    </div>
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
        
    </>
  )
}

export default Login