import Button from "react-bootstrap/Button";
import React from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import Form from "react-bootstrap/Form";

const RegisterForm = () => {
    const {
        email,
        password,
        repeatedPassword,
        error: loginError,
        invalidInputErrorMessage
    } = useStoreState(state => state.register)

    const { register, setEmail, setPassword, setRepeatedPassword, setInvalidInputErrorMessage } = useStoreActions(actions => actions.register)

    const validateInputs = () => {
        if (email === "" || password === "" || repeatedPassword === "") {
            setInvalidInputErrorMessage("Fill all the fields!")
            return false
        }

        if (!email.includes("@")) {
            setInvalidInputErrorMessage("Incorrect email")
            return false
        }

        if (password.size < 8 || !hasUpperCase(password) || !hasNumber(password)) {
            setInvalidInputErrorMessage("Password must me at least 8 characters long, contain number and uppercase letter!")
            return false
        }

        if (repeatedPassword !== password) {
            setInvalidInputErrorMessage("Passwords don't match!")
            return false
        }

        return true
    }

    function hasUpperCase(str) {
        return (/[A-Z]/.test(str));
    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    const handleSubmit = () => {
        if (validateInputs()) {
            register()
            setInvalidInputErrorMessage("")
        }
    }

    return (
        <Form className="bg-white">
            <Form.Group controlId="formBasicEmail">
                <Form.Control
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Control
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password" />
            </Form.Group>

            <Form.Group >
                <Form.Control
                    value={repeatedPassword}
                    onChange={e => setRepeatedPassword(e.target.value)}
                    type="password"
                    placeholder="Repeat password" />
            </Form.Group>
            <p className='error-message'>{invalidInputErrorMessage ? invalidInputErrorMessage : (loginError ? "Email is taken" : <br />) }</p>

            <Form.Group controlId="formBasicCheckbox">
                <Button onClick={() => handleSubmit()} className="btn btn-def btn-block button-basic mt-2">Registreeri</Button>
            </Form.Group>
        </Form>
    )
}

export default RegisterForm;