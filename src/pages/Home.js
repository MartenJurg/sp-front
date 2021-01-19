import React from "react";
import Intern from "./Intern";

function Home() {
    return (
        <div className='home-main justify-content-center row global-bg' >
            <div className=' justify-content-center home-content-container'>
                <span>
                    Hüppelaud sinu karjäärile!
                </span>
                {/*<div>*/}
                {/*    <Button as={Link} to="/praktikandile"  className="button-basic">TUTVU PRAKTIKAKOHTADEGA</Button>*/}
                {/*</div>*/}
            </div>
            <div className="row mt-5 w-100 global-bg">
                <Intern />
            </div>

        </div>
    );
}

export default Home;
