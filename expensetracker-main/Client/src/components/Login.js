import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from '../context/globalState';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useContext(GlobalContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        login({username, password});
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign in</h3>

            <div>
                <label>Username</label>
                <input name="username" required type="text" value={username} 
                onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            </div>

            <div>
                <label>Password</label>
                <input name="password" required type="password" value={password} 
                onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            {error ? <p>Login error</p> : <></>}
            <div className="space"><Link to={"/register"}>Register</Link></div>
            <button type="submit" className="btn">Sign in</button>
        </form>
    );
}