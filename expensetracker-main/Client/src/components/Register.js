import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/globalState';

export const Register = () => {
    if (localStorage.getItem('token')) {
        window.location.href = './home';
    }

    const { register, error } = useContext(GlobalContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        register({username, password, password_confirmation});
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <div>
                <label>Username</label>
                <input name="username" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div>
                <label>Repeat password</label>
                <input name="password_confirmation" required type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Repeat password" />
            </div>
            {error ? <p>Error during registration</p> : <></>}
            <div className="space"><Link to={"/login"}>Sign in</Link></div>
            <button type="submit" className="btn">Register</button>
        </form>
    );
}