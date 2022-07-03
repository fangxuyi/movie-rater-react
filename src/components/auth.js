import React, {useState, useEffect} from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function Auth(){

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ token, setToken ] = useCookies(['mr-token']);
    const [ isLoginView, setIsLoginView ] = useState(true);

    useEffect( () => {
        console.log(token);
        if(token['mr-token']) window.location.href = '/movies';
    }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
        .then( resp => setToken('mr-token', resp.token) )
        .catch( error => console.log(error) )
    }

    const registerClicked = () => {
        API.registerUser({username, password})
        .then( () => loginClicked({username, password}) )
        .catch( error => console.log(error) )
    }
    const isDisabled = username.length === 0 || password.length === 0;

    return (
        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>
            <div className="login-container">
                <label htmlFor="userName">UserName</label><br/>
                <input id="userName" type="text" placeholder="userName" value = {username}
                    onChange={ evt => setUsername(evt.target.value) } /><br/>
                <label htmlFor="password">Password</label><br/>
                <input id="password" type="password" placeholder="Password" value = {password}
                    onChange={ evt => setPassword(evt.target.value) } /><br/>
                {isLoginView ? <button onClick={loginClicked} disabled={isDisabled}>login</button> : <button onClick={registerClicked} disabled={isDisabled}>register</button>}
                {isLoginView ? <p onClick={() => setIsLoginView(false)}>You dont have an account? Register here!</p> :
                <p onClick={() => setIsLoginView(true)}>You already have an account? Login here!</p>}
            </div>
        </div>
    )
}

export default Auth;