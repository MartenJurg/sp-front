import React, {useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {Link} from 'react-router-dom'
import {cvValidation} from "../../utils/inputValidations";

const ProfileInformation = () => {

    const {
        name,
        phone,
        bio,
        linkedInUrl,
        fetchedCvFile,
        selectedCvFile
    } = useStoreState(state => state.profile)
    const {
        setName,
        setPhone,
        setBio,
        setLinkedInUrl,
        setSelectedCvFile,
        updatePersonalData
    } = useStoreActions(action => action.profile)

    const [cvInputErrors, setCvInputErrors] = useState([]);


    const handleChangeCv = value => {
        setSelectedCvFile(value)
        setCvInputErrors(cvValidation(value))
    }

    return (
        <div className="tab-pane active" id="profile"><h6>ISIKU- JA KONTAKTANDMED</h6>
            <hr />
            <form>
                <div className="form-group">
                    <label>Nimi</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <small className="form-text text-muted">
                        Kuvatav nimi. Saate seda muuta või vahetada koguaeg.
                    </small>
                </div>
                <div className="form-group">
                    <label>Telefon</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Lühikirjeldus</label>
                    <textarea
                        className="form-control autosize"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>LinkedIn link</label>
                    <input
                        type="text"
                        className="form-control"
                        id="url"
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>CV</label>
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={event => handleChangeCv(event.target.files[0])}
                        />
                        <label className={"custom-file-label" + (cvInputErrors.length === 0 ? "" : " red-border-sm")} htmlFor="customFile">{selectedCvFile ? selectedCvFile.name : "Vali fail"}</label>
                    </div>
                    {cvInputErrors.map((value) => {
                        return<small className="form-text text-muted color-red">{value}</small>
                    })}
                    {fetchedCvFile && fetchedCvFile !== ''
                            ? <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(fetchedCvFile);}} >Lae viimane CV alla</Link>
                            : ""}
                </div>
                <div className="form-group small text-muted">
                    All of the fields on this page
                    are optional and can be deleted at any time, and by filling them out,
                    you're giving us consent to share this data wherever your user profile
                    appears.
                </div>
                <button type="button" className="btn btn-primary" onClick={updatePersonalData}>Uuenda profiili</button>
            </form>
        </div>

    )
}

export default ProfileInformation;