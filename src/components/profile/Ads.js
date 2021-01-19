import React, {useEffect, useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import Select from "react-select";
import CustomLoader from "../CustomLoader";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {baseURL} from "../../Constants";
import profileDefault from "../../resources/images/user-default.png";

const Ads = () => {

    const {ads} = useStoreState(state => state.advertisement)
    const {fetchUserAds, setAds} = useStoreActions(action => action.advertisement)
    const {candidature, vanillaCandidature, loading} = useStoreState(state => state.candidate)
    const {fetchCandidates, fetchVanillaCandidates} = useStoreActions(action => action.candidate)

    const {checkToken} = useStoreActions(action => action.token)

    useEffect(() => {
        setAds([])
        checkToken()
        fetchUserAds()
    }, [])

    const getOptions = () => {
        return ads.map(function (obj, key) {
            return {label: obj.internshipProvider.name + ", " + obj.title , value: obj.id}
        })
    }

    const handleChange = value => {
        fetchCandidates(value.value)
        fetchVanillaCandidates(value.value)
    }

    const CandidateRow = props => {
        return (
            <tr>
                <td>
                    <div className="row justify-content-center">
                        <div className=' inner profile-picture sm'
                             style={props.candidate.img
                                 ? {backgroundImage:`url(${baseURL}${props.candidate.img})`}
                                 : {backgroundImage:`url(${profileDefault})`}}
                        >
                            {" "}
                        </div>

                        <div className='col-12 col-lg-6 col-xl-6'>
                            <p>Nimi: {props.candidate.internDto.full_name}</p>
                            <p>Email: {props.candidate.internDto.email}</p>
                            <p>CV: {props.candidate.cvUrl ? <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(props.candidate.cvUrl);}} >Link</Link> : "-"}</p>
                            <p>LinkedIn: {props.candidate.linkedIn ? <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(props.candidate.linkedIn);}} >Link</Link> : "-"}</p>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

    const VanillaCandidateRow = props => {
        return (
            <tr>
                <td>
                    <div className="row justify-content-center">
                        <div className=' inner profile-picture sm' style={{backgroundImage:`url(${profileDefault})`}}>
                            {" "}
                        </div>
                        <div className='col-12 col-lg-6 col-xl-6'>
                            <p>Email: {props.vanillaCandidate.email}</p>
                            <p>CV: {props.vanillaCandidate.CV ? <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(props.vanillaCandidate.CV);}} >Link</Link> : "-"}</p>
                            <p>LinkedIn: {props.vanillaCandidate.linkedin ? <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(props.vanillaCandidate.linkedin);}} >Link</Link> : "-"}</p>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

    const Candidature = () => {
        return (
            <div>
                <div>
                    {
                        candidature.lenght === 0 ? ""
                            : (
                                <Table className="mb-5" striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Regristreerunud kandidaadid</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {candidature.map((value, index) => {
                                        return <CandidateRow id={index} candidate={candidature[index]}/>
                                    })}
                                    </tbody>
                                </Table>
                            )
                    }
                </div>
                <div>
                    {
                        vanillaCandidature.length === 0 ? " "
                            :(
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Tavalised kandidaadid</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {vanillaCandidature.map((value, index) => {
                                        return <VanillaCandidateRow id={index} vanillaCandidate={vanillaCandidature[index]}/>
                                    })}
                                    </tbody>
                                </Table>
                            )
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="form-group">
                <label>Vali kuulutus</label>
                {!ads ? "Kuulutusi pole" : <Select options={getOptions()} onChange={handleChange}/>}
            </div>
            <hr/>
            <h6>KANDIDAADID</h6>
            <form className='border-0'>
                <div className="form-group mb-0 border-0">
                    <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm border-0">
                        {
                            loading
                                ? <CustomLoader />
                                : candidature.length === 0 && vanillaCandidature.length === 0
                                    ? "Kandidaate pole"
                                    : <Candidature />
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Ads;