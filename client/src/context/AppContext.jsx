import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(false);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const loadCreditData = async ()=>{

        // console.log(token)

        try {
            const {data} = await axios.get(backendURL + '/api/user/credits', {headers: {token}});

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            } else {
                console.error('Failed to load credit data:', data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const generateImage = async (prompt) => {
        try {
            // console.log(prompt + " " + token)
            const {data} = await axios.post(backendURL + '/api/image/generate-img', { prompt }, {
                headers: {token}
            })

            // console.log(data)

            if (data.success) {
                loadCreditData()
                return data.image;
            } else {
                toast.error(data.message);
                loadCreditData()

                if (data.creditBalance === 0){
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

    const values = {
        user, setUser, showLogin, setShowLogin, backendURL, token, setToken, credit, setCredit, loadCreditData, logout, generateImage
    };

    return (<AppContext.Provider value={values}>  {props.children}  </AppContext.Provider>)
}

export default AppContextProvider;