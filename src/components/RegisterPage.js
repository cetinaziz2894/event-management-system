import React, { useState } from 'react'
import { FaEnvelope, FaKey, FaQrcode, FaUser } from 'react-icons/fa'
import '../assets/styles/_login.scss';
import login_img from '../assets/img/img-01.png';
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [paswordConfirmed, setPaswordConfirmed] = useState("")
    const [fullName, setFullName] = useState("");
    const [hesCode, setHesCode] = useState("");
    const history = useHistory();
    const { signup } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const validateForm = (fullName, email,hesCode, password, paswordConfirmed) => {
        let errors = [];
        if(!fullName || fullName==null || fullName===""){
            errors.push("Fullname is not be empty!");
        }
        if(!fullName.length >= 3){
            errors.push("Fullname must be longer than 3 characters!");
        }
        if(!hesCode || hesCode==null || hesCode===""){
            errors.push("Hes code is not be empty!");
        }
        if(!hesCode.length === 10){
            errors.push("Hes Code must be equal to 12 characters!");
        }
        if(!email || email==null || email===""){
            errors.push("Email is not be empty!");
        }
        if(!password || password==null || password===""){
            errors.push("Password is not be empty!");
        }
        if(password.length < 6){
            errors.push("Password should be minimum 6 characters.");
        }
        if (password !== paswordConfirmed) {
            errors.push("Password and confirmtion password is not equal!");
        }
        if (errors.length > 0) {
            setError(errors);
            return false;
        }else{
            setError('');
            return true;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError([]);
        if(validateForm(fullName, email,hesCode, password, paswordConfirmed)){
            try {
                setLoading(true);
                let result = await signup(fullName, email,hesCode, password);
                const {errorCode, errorMessage} = result;
                console.log(errorCode);
                if(errorCode){
                    setError(errorMessage)
                }else{
                    history.push("/");
                }
                } catch {console.log("Error")
                }
        }
        setLoading(false);
    }
    return (
        <div className="container-login">
        <div className="wrap-login">
            <div className="login-pic">
                <img src={login_img} alt="login" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <span className="login-form-title">
                    Event Member Registration
                </span>
                <div className="wrap-input">
                    <label>
                        <FaUser/>
                        <input 
                            className="input" 
                            type="text" 
                            name="fullname" 
                            placeholder="Full Name" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </label>
                </div>

                <div className="wrap-input">
                    <label>
                        <FaEnvelope />
                        <input 
                            className="input" 
                            type="text" 
                            name="email" 
                            placeholder="Email Address"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>

                <div className="wrap-input">
                    <label>
                        <FaQrcode />
                        <input 
                            className="input" 
                            type="text" 
                            name="text" 
                            placeholder="HES Code (A1A1-1111-11)"
                            pattern="[A-Z][0-9][A-Z][0-9]-[0-9]{4}-[0-9]{2}"
                            value={hesCode}
                            onChange={(e) => setHesCode(e.target.value)} />
                    </label>
                </div>

                <div className="wrap-input">
                    <label>
                        <FaKey />
                        <input 
                            className="input" 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>

                <div className="wrap-input">
                    <label>
                        <FaKey />
                        <input 
                            className="input" 
                            type="password" 
                            name="passwordConfirm" 
                            placeholder="Password Confirmation"
                            value={paswordConfirmed}
                            onChange={(e) => setPaswordConfirmed(e.target.value)} />
                    </label>
                </div>

                <div className="wrap-input">
                    <button className="login-form-btn" type="submit" disabled={loading ? true : false}>Sign Up</button>
                </div>
                <div className="wrap-input alert">
                    {error &&  <ul>{typeof(error) === 'object' ?  error.map((el,index)=><li className="error" key={index}>{el}</li>) : <li>{error}</li>}</ul>}
                </div>
            </form>
    </div>
</div>
    )
}