import {useStoreActions, useStoreState} from "easy-peasy";
import React, {useEffect} from "react";
import CompanyForm from "../components/CompanyForm";
import AdvertisementForm from "../components/AdvertisementForm";
import {Link, Redirect} from "react-router-dom";
import {baseURL} from "../Constants";


const Advertisement = () => {
    const { chosenDeal } = useStoreState(state => state.deal);
    const { setSuccessful } = useStoreActions(actions => actions.advertisementOffer);
    const { successful, invoice } = useStoreState(state => state.advertisementOffer);

    useEffect(() => {
        setSuccessful(null)
    }, [])

    if (chosenDeal === '') return <Redirect to={{pathname: '/praktikapakkujale'}}/>

    const SuccessModal = () => {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className={"col-10"}>
                        <h5>
                            Kuulutus on edukalt lisatud. Aktiveerimiseks tasuge{' '}
                            <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(baseURL + invoice);}} >ARVE</Link>
                            !
                        </h5>
                    </div>
                    <img className="col-3" width="300" alt="" src={require("../resources/images/success.png")} />
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="container mb-5">
                <div className="container">
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                    </nav>
                    <div className="row gutters-sm justify-content-center">
                        <div className="col-12 col-md-10">
                            <div className="card ">
                                <div className="card-body tab-content m-3">
                                    {
                                        successful
                                            ? <SuccessModal />
                                            : <div className="row" id="profile">
                                                <div className='col-12'>
                                                    <h3>Ettevõtte andmed</h3>
                                                    <hr />
                                                </div>

                                                <CompanyForm />

                                                <div className='col-12'>
                                                    <h3>Kuulutuse andmed</h3>
                                                    <hr />
                                                </div>
                                                <AdvertisementForm />
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advertisement;