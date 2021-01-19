import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import SelectDropdown from "react-dropdown-select";
import {
    advertisementTitleValidation,
    advertisementCategoryValidation,
    advertisementCheckboxCheckedValidation,
    imageValidation
} from "../utils/inputValidations"

const AdvertisementForm = () => {
    const [addClicked, setAddClicked] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [titleInputErrors, setTitleInputErrors] = useState([]);
    const [categoryInputErrors, setCategoryInputErrors] = useState([]);
    const [conditionOfUseErrors, setConditionOfUseErrors] = useState([]);
    const [imageInputErrors, setImageInputErrors] = useState([]);

    const { chosenDeal } = useStoreState(state => state.deal);

    const { chosenCategories, title, body, img, successful, error } = useStoreState(state => state.advertisementOffer);
    const { setChosenCategories, setTitle, setBody, setImg, setInternshipProvider, setDeal, setSuccessful, setError, addAdvertisement } = useStoreActions(actions => actions.advertisementOffer)

    const { chosenInternshipProvider, inputsValid } = useStoreState(state => state.internshipProvider);
    const { addInternshipProvider } = useStoreActions(actions => actions.internshipProvider)

    const { categories } = useStoreState(state => state.category);
    const { fetchAllCategories } = useStoreActions(actions => actions.category)

    const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

    useEffect(() => {
        resetFields()
        fetchAllCategories()
    }, [])

    useEffect(() => {
        if (addClicked) {
            addAdvertisementToServer()
            setAddClicked(false)
        }
    }, [chosenInternshipProvider])

    const handleChangeTitle = value => {
        setTitle(value)
        setTitleInputErrors(advertisementTitleValidation(value))
    }

    const handleChangeCategory = values => {
        if (values && values.length <= 3 ) {
            setChosenCategories(values)
        }
        setCategoryInputErrors(advertisementCategoryValidation(values))
    }

    const handleChangeCheckboxChecked = value => {
        setCheckboxChecked(value)
        setConditionOfUseErrors(advertisementCheckboxCheckedValidation(value))
    }
    
    const handleChangeImage = value => {
        setImg(value)
        setImageInputErrors(imageValidation(value))
    }

     const resetFields = () => {
        setChosenCategories([])
        setInternshipProvider('')
        setTitle('')
        setBody('')
        setImg('')
        setSuccessful(null)
        setError(false)
    }

    const getOptions = () => {
        if (chosenCategories.length >= 3) {
            return []
        } else {
            return categories.map(function(obj) {return {label: obj.name, value: obj.id}})
        }
    }

    const allInputsValid = () => {
        handleChangeTitle(title)
        handleChangeCategory(chosenCategories)
        handleChangeCheckboxChecked(checkboxChecked)
        return titleInputErrors.length === 0
            && imageInputErrors.length === 0
            && categoryInputErrors.length === 0
            && conditionOfUseErrors.length === 0
    }

    const handleSubmit = () => {

        if (allInputsValid()) {
            if (checkboxChecked) {
                if (!chosenInternshipProvider) {
                    if (inputsValid) {
                        addInternshipProvider()
                        setAddClicked(true)
                    } else {
                        setError("Ettevõtte andmed ei ole täidetud!")
                    }
                } else {
                    addAdvertisementToServer()
                }
            }
        }
    }

    const addAdvertisementToServer = () => {
        if (Number.isInteger(chosenInternshipProvider)) {
            setInternshipProvider(chosenInternshipProvider)
        } else {
            setInternshipProvider(chosenInternshipProvider.id)
        }
        setDeal(chosenDeal)
        addAdvertisement()
    }

    return (

        <form className='col-12 row'>
            <div className="form-group col-12 col-md-6">
                <label>Ametikoht</label>
                <input
                    type="text"
                    className={"form-control" + (titleInputErrors.length === 0 ? "" : " red-border")}
                    value={title}
                    onChange={(e) => handleChangeTitle(e.target.value)}
                />
                {titleInputErrors.map((value) => {
                    return <small className="form-text text-muted color-red">{value}</small>
                })}
            </div>
            <div className="form-group col-12 col-md-6">
                <label>Kategooriad</label>
                <SelectDropdown
                    className={(categoryInputErrors.length === 0 ? "" : " red-border")}
                    styles={selectStyles}
                    options={getOptions()}
                    onChange={values => handleChangeCategory(values)}
                    multi={true}
                />
                {categoryInputErrors.map((value) => {
                    return <small className="form-text text-muted color-red">{value}</small>
                })}
            </div>
            <div className="form-group col-12">
                <label>Pilt</label>

                <div className={"custom-file"}>
                    <input
                        type="file"
                        className={"custom-file-input"}
                        id="customFile"
                        onChange={event => handleChangeImage(event.target.files[0])}
                    />
                    <label className={"custom-file-label" + (imageInputErrors.length === 0 ? "" : " red-border-sm")} htmlFor="customFile">{img ? img.name : "Vali fail"}</label>
                </div>
                {imageInputErrors.map((value) => {
                            return<small className="form-text text-muted color-red">{value}</small>
                })}
            </div>
            <div className="form-group col-12">
                <label>Sisu</label>

                <textarea
                    rows="8"
                    className="form-control no-resize"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className="col">
                <input className={"mt-4"} type="checkbox" onChange={() => handleChangeCheckboxChecked(!checkboxChecked)}/> <span className={(conditionOfUseErrors.length === 0 ? "" : " color-red")}> Olen tutvunud <a href="/#">kasutustingimustega</a></span>
                {conditionOfUseErrors.map((value) => {
                    return <small className="form-text text-muted color-red">{value}</small>
                })}
            </div>
            <div className="row justify-content-between w-100">
                <Button disabled={successful} className='button-basic shadow-none mt-3 ml-4 ' onClick={() => handleSubmit()}>
                    Lisa kuulutus
                </Button>
                <div>

                </div>
            </div>
        </form>
    )
}

export default AdvertisementForm;