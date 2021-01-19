import React, {useEffect, useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import Select from "react-select";
import {
    registryCodeValidation,
    emailValidation,
    addressValidation,
    companyNameValidation,
    imageValidation
} from "../utils/inputValidations"


const CompanyForm = () => {
    const {
        registryCode,
        name,
        img,
        email,
        address,
        fetchedInternshipProviders,
        chosenInternshipProvider,
        inputsValid
    } = useStoreState(state => state.internshipProvider)

    const {
        setRegistryCode,
        setName,
        setImg,
        setEmail,
        setPhone,
        setAddress,
        fetchInternshipProviders,
        setChosenInternshipProvider,
        setInputsValid
    } = useStoreActions(actions => actions.internshipProvider)

    const [registryCodeInputErrors, setRegistryCodeInputErrors] = useState([]);
    const [nameInputErrors, setNameInputErrors] = useState([]);
    const [emailInputErrors, setEmailInputErrors] = useState([]);
    const [imageInputErrors, setImageInputErrors] = useState([]);
    const [addressInputErrors, setAddressInputErrors] = useState([]);

    const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

    useEffect( () => {
        fetchInternshipProviders()
    }, [])

    useEffect( () => {
        allInputsValid()
    }, [registryCode, email, img, address, name])

    const allInputsValid = () => {
        if (registryCode.length === 8
            && name
            && email.includes("@")
            && address
            && registryCodeInputErrors.length === 0
            && nameInputErrors.length === 0
            && emailInputErrors.length === 0
            && imageInputErrors.length === 0
            && addressInputErrors.length === 0) {
            setInputsValid(true)
        }
    }

    const handleChangeRegistryCode = value => {
        setRegistryCode(value)
        setRegistryCodeInputErrors(registryCodeValidation(value))
    }

    const handleChangeName = value => {
        setName(value)
        setNameInputErrors(companyNameValidation(value))
    }

    const handleChangeImage = value => {
        setImg(value)
        setImageInputErrors(imageValidation(value))
    }

    const handleChangeEmail = value => {
        setEmail(value)
        setEmailInputErrors(emailValidation(value))
    }

    const handleChangeAddress = value => {
        setAddress(value)
        setAddressInputErrors(addressValidation(value))
    }

    const getOptions = () => {
        return fetchedInternshipProviders.map(function(obj, key) {
            return {label: obj.name + ", " + obj.email + ", " + obj.registryCode, value: key}})
    }

    const isDisabled = () => { return chosenInternshipProvider !== '' }

    const handleChange = value => {
        console.log(value)
        if (value) {
            const ip = fetchedInternshipProviders[value.value]
            setChosenInternshipProvider(ip)

            setRegistryCode(ip.registryCode)
            setName(ip.name)
            setEmail(ip.email)
            setPhone(ip.phone)
        } else {
            setChosenInternshipProvider('')
            setRegistryCode('')
            setName('')
            setEmail('')
            setPhone('')
        }
    }

    return (
        <form className='col-12 mb-5 row'>
            {fetchedInternshipProviders && fetchedInternshipProviders.length === 0 ? "" :
                <div className="form-group col-12">
                    <label>Vali olemasolev ettevõte</label>
                    <Select
                        styles={selectStyles}
                        options={getOptions()}
                        onChange={value => handleChange(value)}
                        isClearable
                    />
                </div>
            }

            {chosenInternshipProvider ? "" :
                <div className="form-group col-12 col-md-6">
                    <label>Registrikood</label>
                    <input
                        type="text"
                        className={"form-control" + (registryCodeInputErrors.length === 0 ? "" : " red-border")}
                        value={registryCode}
                        disabled={isDisabled()}
                        onChange={(e) => handleChangeRegistryCode(e.target.value)}
                    />
                    {registryCodeInputErrors.map((value) => {
                        return <small className="form-text text-muted color-red">{value}</small>
                    })}
                </div>
            }

            {chosenInternshipProvider ? "" :
                <div className="form-group col-12 col-md-6">
                    <label>Ettevõtte nimi</label>
                    <input
                        type="text"
                        className={"form-control" + (nameInputErrors.length === 0 ? "" : " red-border")}
                        value={name}
                        disabled={isDisabled()}
                        onChange={(e) => handleChangeName(e.target.value)}
                    />
                    {nameInputErrors.map((value) => {
                        return <small className="form-text text-muted color-red">{value}</small>
                    })}
                </div>
            }

            {chosenInternshipProvider ? "" :
                <div className="form-group col-12 col-md-6">
                    <label>Logo</label>

                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={event => handleChangeImage(event.target.files[0])}
                        />
                        <label className={"custom-file-label" + (imageInputErrors.length === 0 ? "" : " red-border-sm")} htmlFor="customFile">
                            {img ? img.name : "Vali fail"}
                        </label>
                    </div>
                    {imageInputErrors.map((value) => {
                        return <small className="form-text text-muted color-red">{value}</small>
                    })}
                </div>
            }

            {chosenInternshipProvider ? "" :
                <div className="form-group col-12 col-md-6">
                    <label>Email</label>
                    <input
                        type="text"
                        className={"form-control" + (emailInputErrors.length === 0 ? "" : " red-border")}
                        value={email}
                        disabled={isDisabled()}
                        onChange={(e) => handleChangeEmail(e.target.value)}
                    />
                    {emailInputErrors.map((value) => {
                        return <small className="form-text text-muted color-red">{value}</small>
                    })}
                </div>
            }

            {chosenInternshipProvider ? "" :
                <div className="form-group col-12 col-md-6">
                    <label>Aadress</label>
                    <input
                        type="text"
                        className={"form-control" + (addressInputErrors.length === 0 ? "" : " red-border")}
                        value={address}
                        disabled={isDisabled()}
                        onChange={(e) => handleChangeAddress(e.target.value)}
                    />
                    {addressInputErrors.map((value) => {
                        return <small className="form-text text-muted color-red">{value}</small>
                    })}
                </div>
            }

        </form>
    )
}

export default CompanyForm;