import React, { useState } from 'react';
import '../assets/styles/_login.scss';
import login_img from '../assets/img/img-01.png';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { login } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const validateForm = (email, password) => {
        let errors = [];
        if(!email || email==null || email===""){
            errors.push("Email is not be empty!");
        }
        if(!password || password==null || password===""){
            errors.push("Password is not be empty!");
        }
        if(password.length < 6){
            errors.push("Password should be minimum 6 characters.");
        }
        if (errors.length > 0) {
            setError(errors);
            return false;
        }else{
            setError('');
            return true;
        }
    }

    const loginHandler = async (e,email, password) => {
        e.preventDefault();
        if(validateForm( email, password)){
            try {
                setError("")
                setLoading(true);
                let result = await login(email, password);
                const {errorCode, errorMessage} = result;
                console.log(errorCode);
                if(errorCode){
                    setError(errorMessage)
                }else{
                    history.push("/");
                }
            } catch {
                setError("Failed to login.")
            }
        }
        setLoading(false)
    }
    return (
        <div className="container-login">
            <div className="wrap-login">
                <div className="login-pic">
                    <img src={login_img} alt="login" />
                </div>
                <form className="login-form">
                    <span className="login-form-title">
                        Event Member Login
                    </span>
                    <div className="wrap-input">
                        <label>
                            <FaUser />
                            <input 
                                className="input" 
                                type="text" 
                                name="Email" 
                                placeholder="E-mail Address"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)} 
                            />
                        </label>
                    </div>
                    <div className="wrap-input">
                        <label>
                            <FaEnvelope />
                            <input 
                                className="input" 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </label>
                    </div>
                    <div className="wrap-input">
                        <button 
                            className="login-form-btn"
                            type="submit"
                            disabled={loading}
                            onClick={ (e) => loginHandler(e,email, password)}
                            >
                            Login
                        </button>
                    </div>
                    <div className="wrap-input text">
                        Don't have an account? <Link className="link" to="/register"> Register </Link> now.
                    </div>
                    <div className="wrap-input alert">
                    {error &&  <ul>{typeof(error) === 'object' ?  error.map((el,index)=><li className="error" key={index}>{el}</li>) : <li>{error}</li>}</ul>}
                </div>
                </form>
        </div>
    </div>
    )
}
export default LoginPage;
