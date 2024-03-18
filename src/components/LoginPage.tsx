import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';


const LoginPage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const authContext = React.useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username: userName,
                password: password
            });
            console.log(response);
            if (response.status === 200) {
                const token = response.data.token; 
                
                localStorage.setItem('token', token);

               
                axios.defaults.headers.common['Authorization'] = `Token ${token}`;
                authContext?.setIsAuthenticated(true);

                navigate('/');
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 h-max text-center p-2 px-4">
                <div className='font-bold text-4xl pt-6'>
                    <h1>Login</h1>
                    </div>
                <div className="text-slate-500 text-md pt-1 px-4 pb-4">
                Enter your credentials to create an account
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />  
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="pt-4">
                <button onClick={handleLogin}>Login</button>
                </div>
                <div className="py-2 text-sm flex justify-center">
                    <div>
                        Don't have an account?
                    </div>
                    <Link className="pointer underline pl-1 cursor-pointer" to={"/signup"}>
                        Sign up
                    </Link>

                    </div>
                </div>
        </div>
        
    </div> 
    )
}

export default LoginPage

