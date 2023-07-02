import axios from "axios";

const clienteaxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteaxios;