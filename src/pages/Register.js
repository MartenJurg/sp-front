import React from "react";
import {useStoreState} from "easy-peasy";
import CustomLoader from "../components/CustomLoader";
import {Redirect} from "react-router-dom";
import RegisterForm from "../components/authentication/RegisterForm";


const Register = () => {

    const {successful, loading: registerLoading} = useStoreState(state => state.register)

    if (successful) {
        return (
            <Redirect to="/profiil"/>
        )
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col form-box bg-white">
                    <div className="text-center m-5 ">
                        <span className="h2">Registreeru</span>
                    </div>
                    {registerLoading ? <CustomLoader/> : <RegisterForm/>}
                </div>
            </div>
        </div>
    );
}


export default Register;
