import { useState } from "react";
import logo from '../assets/rentiq.png';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState("");
    const {resetPassword}=useAuth();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(checkPassword() === true){
    //         setErrorMessage("ERROR: Password cannot be less that 8 characters.");
    //         setPassword("");
    //     } else{
    //         setErrorMessage("");
    //     }
    // }

    async function handleSubmit(e){
        e.preventDefault();
            try{
                setMessage("");
                setErrorMessage("");
                setLoading(true); 
                await resetPassword(email);
                setMessage("Please check your inbox for instructions to reset your password");
            } catch{
                setErrorMessage("ERROR: Failed to Reset Password")
            }
            setLoading(false);
    }

   
    return (
        <div>
            

            <div>
                <h3>Reset your password !</h3>
                <br/>
                <form onSubmit={handleSubmit}>
                    <label for="email">Email:</label>
                    <br/>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
                    <br/>

                    <button type="submit" >Reset Password</button>
                    <strong>{message}</strong>


                </form>

                <p>{errorMessage}</p>

                <Link to="/sign-in">Sign in</Link>

            </div>

        </div>
    );
}

export default ForgotPassword;