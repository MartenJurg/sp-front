import React from "react";
import CustomLoader from "../components/CustomLoader"
import LoginForm from "../components/authentication/LoginForm";
import {useStoreState} from "easy-peasy";
import {Redirect} from "react-router-dom";

const Login = () => {
    const { successful, loading: loginLoading } = useStoreState(state => state.login)

    if (successful) {
        return (
            <Redirect to="/profiil" />
        )
    }

    return (
        <div className="container ">
            <div className="row justify-content-center">
                <div className="col form-box bg-white">
                    <div className="text-center m-5 ">
                        <span className="h2">Logi sisse</span>
                    </div>
                    {loginLoading ? <CustomLoader /> : <LoginForm />}
                </div>
            </div>
        </div>
    );
}


export default Login;
