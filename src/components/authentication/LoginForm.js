import Button from "react-bootstrap/Button";
import React from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {Link} from 'react-router-dom'

const LoginForm = () => {
    const {
        email,
        password,
        error: loginError,
    } = useStoreState(state => state.login)

    const { login, setEmail, setPassword } = useStoreActions(actions => actions.login)



    const handleSubmit = () => {
        login()
    }

    return (
        <div className="col-sm-12 col-md-12 col-md-offset-1">
            <form action="" id="loginForm" >
                <div className="form-group input-group">
                    <input
                        className="form-control"
                        type="text"
                        name='username'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group input-group">
                    <input
                        className="form-control mb-1"
                        type="password"
                        name='password'
                        placeholder="parool"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="error-message">{loginError ? "Invalid username or password" : <br /> }</p>


                <div className="form-group">
                    <Button
                        type="button"
                        className="btn btn-def btn-block button-basic mt-3"
                        onClick={() => handleSubmit()}
                    >
                        Sisene
                    </Button>
                </div>
                <div className="form-group text-center ">
                    <Link to="/">Unustasin parooli</Link>&nbsp;|&nbsp;<Link to="signup">Registreeru</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;