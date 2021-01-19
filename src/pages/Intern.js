import React, {useEffect, useState} from "react";
import AdvertisementHeader from "../components/advertisement/AdvertisementHeader";
import CustomLoader from "../components/CustomLoader";
import AdvertisementCard from "../components/advertisement/AdvertisementCard";
import {useStoreActions, useStoreState} from "easy-peasy";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {baseURL, isDev} from "../Constants"
import {checkUser} from "../Auth";

const Intern = () => {
    const { loading, ads, chosenAdvertisement, showModal } = useStoreState(state => state.advertisement);
    const { fetchAds, setShowModal } = useStoreActions(actions => actions.advertisement)

    const [autoFocusEmail, setAutoFocusEmail] = useState(true)

    const { successful, error, vanillaEmail, vanillaCv, vanillaLinkedin } = useStoreState(state => state.candidate);
    const {
        setSuccessful,
        setError,
        setLoading,
        addCandidature,
        addVanillaCandidature,
        setVanillaCv,
        setVanillaEmail,
        setVanillaLinkedin
    } = useStoreActions(actions => actions.candidate)

    useEffect( () => {
        setSuccessful(false)
        setError(false)
        setLoading(false)
        fetchAds()
    }, [])

    const handleCandidate = id => {
        if (checkUser(false)) {
            addCandidature(id)
        } else {
            addVanillaCandidature(id)
        }
    }

    const getImg = () => {
        if (isDev) {
            return <img
                className="rounded"
                width="70px"
                height="70px"
                src={require('../resources/images/internship-provider-default-image.png')}
                alt=""
            />
        } else {
            return chosenAdvertisement && chosenAdvertisement.internshipProvider && chosenAdvertisement.internshipProvider.image
                ? <img
                    className="rounded"
                    width="70px"
                    height="70px"
                    src={baseURL + chosenAdvertisement.internshipProvider.image}
                    alt=""
                />
                : ""
        }
    }

    const getAdvertisementImg = () => {
        return chosenAdvertisement && chosenAdvertisement.image
            ?  <img className='center advertisement-img' src={baseURL + chosenAdvertisement.image} alt=""/>
            : ""
    }

    const fileAdded = event => {
        setVanillaCv(event.target.files[0])
    }
    const handleEmailChange = value => {
        setVanillaEmail(value)
        setAutoFocusEmail(true)
    }

    const handleLinkedinChange = value => {
        setVanillaLinkedin(value)
        setAutoFocusEmail(false)
    }

    const NotLoggedInModel = () => {
        return (
            <div id={"notLoggedInModal"} className=" col-12 col-lg-9 row">
                <div id={"notLoggedInModalDiv"} className="col-12 col-lg-4 mb-2 p-1">
                    <input
                        id={"notLoggedInModalInput"}
                        placeholder="Email"
                        type="text"
                        className="form-control"
                        value={vanillaEmail}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        autoFocus={autoFocusEmail}
                    />
                </div>
                <div className="col-12 col-lg-4 mb-2 p-1">
                    <input
                        placeholder="Linkedin Url"
                        type="text"
                        className="form-control"
                        value={vanillaLinkedin}
                        onChange={(e) => handleLinkedinChange(e.target.value)}
                        autoFocus={!autoFocusEmail}
                    />
                </div>
                <div className="col-12 col-lg-4 form-group p-1">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={fileAdded}
                        />
                        <label className="custom-file-label" htmlFor="customFile" > {vanillaCv ? vanillaCv.name : "CV"}</label>
                    </div>
                </div>
            </div>
        )
    }

    const MyVerticallyCenteredModal = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                id="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getImg()}
                        {' '}
                        {chosenAdvertisement && chosenAdvertisement.internshipProvider && chosenAdvertisement.internshipProvider.name}, {chosenAdvertisement.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='justify-content-center'>
                        {getAdvertisementImg()}
                    </p>
                    <p className='m-5'>
                        {chosenAdvertisement.text}
                    </p>
                </Modal.Body>
                <Modal.Footer >
                    <div className="row justify-content-around">
                        {!checkUser(false) ? <NotLoggedInModel id="NotLoggedIn" /> : <div className="col" />}
                        { error && checkUser(false) ? "Olete juba kandideerinud!" : "" }
                        {successful ? <img className="col-2" width="300" style={{maxWidth: 100}} src={require("../resources/images/success.png")} /> : ""}
                        {error || successful ? "" : <Button className='btn button-basic mt-0 shadow-none' onClick={() => handleCandidate(chosenAdvertisement.id)}>Kandideeri</Button>}
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className='container'>
            <div>
                <AdvertisementHeader />
            </div>

            <div>
                {
                    loading
                        ? <CustomLoader />
                        : ads.length === 0
                        ? <div className='row justify-content-center mt-5'>
                            <h3>
                                Kuulutusi pole!
                            </h3>
                        </div>
                        :<div className='row justify-content-center'>
                            {ads.map((key, value) => {return <AdvertisementCard key={value} advertisement={key} />})}
                        </div>
                }

                <MyVerticallyCenteredModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    id="modal"
                />
            </div>
        </div>
    );
}

export default Intern;