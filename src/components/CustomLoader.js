import React from "react";
import Loader from "react-loader-spinner";

const CustomLoader = () => (
    <div className="custom-loader">
        <Loader type="Oval" color="hsl(196, 100%, 45%)" height="100%" width="100%"/>
    </div>
)

export default CustomLoader;
