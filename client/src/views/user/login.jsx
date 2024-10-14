import React, { useState , useContext} from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../contexts/user/userContext';


const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // this flag is to send to home route...
    const [flag, setFlag] = useState(false);

    // this flag is to send to home route.
    const [flag1 , setFlag1] = useState(false);

    // getting function from context...
    const {setUser , setIsAdmin} = useContext(UserContext);
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!userEmail || !userPassword) {
            setErrorMessage('Both fields are required.');
            return;
        }
        if (!validateEmail(userEmail)) {
            setErrorMessage('Please enter a valid email.');
            return;
        }
        if (userPassword.length < 4) {
            setErrorMessage('Password must be at least 3 characters long.');
            return;
        };

        try{
            const {data} = await axios.post("/login/user" , {
                userEmail , userPassword
            });
            
            setUser(data.data.user);
            setIsAdmin(data.data.flag);
            // setting the token to local storage..
            localStorage.setItem("userToken" , data.userToken);
            localStorage.setItem("isAdmin" , data.data.flag);
            localStorage.setItem("user" , JSON.stringify(data.data.user));
            alert(data.message);
            setErrorMessage("");
            setFlag1(true);
        }catch(e){
            console.log(e);
            setUser(null);
            localStorage.clear();
            setIsAdmin(null);
            alert(e.response.data.error.message);
        }
    
    };

    // Basic email validation
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    if (flag) {
        return <Navigate to="/register" />
    };

    if(flag1){
        return <Navigate to={"/"} />
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>

            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={() => setFlag(true)}
                        className="text-blue-500 hover:underline"
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
