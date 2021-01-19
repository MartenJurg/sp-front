import {useStoreActions, useStoreState} from "easy-peasy";
import {profileSettingsEnum} from '../Constants';
import SVG from '../resources/SVG';
import React, {useEffect} from "react";
import ProfileInformation from "../components/profile/ProfileInformation";
import Ads from "../components/profile/Ads";
import Security from "../components/profile/Security";
import profileDefault from '../resources/images/user-default.png'
import {baseURL} from '../Constants'
import CustomLoader from "../components/CustomLoader";

const Profile = () => {
    const {activeTab, fetchedProfilePicture, loading} = useStoreState(state => state.profile)
    const {setActiveTab, addProfilePicture, fetchProfilePicture, fetchPersonalData, fetchCV, setLoading } = useStoreActions(action => action.profile)
    const { checkToken } = useStoreActions(action => action.token)

    useEffect( () => {
        setLoading(true)
        checkToken()
        fetchProfilePicture()
        fetchPersonalData();
        fetchCV()
    }, [])

    const onClick = value => {
        setActiveTab(value)
    }

    const getActiveTab = () => {
        switch (activeTab) {
            case profileSettingsEnum.PROFILE:
                return <ProfileInformation/>
            case profileSettingsEnum.SECURITY:
                return <Security/>
            case profileSettingsEnum.INVOICE:
                return <Ads/>
            default:
                return <ProfileInformation/>
        }
    }

    const isActive = value => {
        return activeTab === value;
    }

    const handleChange = event => {
        addProfilePicture(event.target.files[0])
    }

    if (loading) {
        return <CustomLoader />
    }

    return (
        <div className="container">
            <div className="container">
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                </nav>
                <div className="row gutters-sm">
                    <div className="col-md-4 d-none d-md-block">
                        <div className="card">
                            <div className="card-body">
                                <nav className="nav flex-column nav-pills nav-gap-y-1">
                                    <div className='outer '>
                                        <div className='inner profile-picture'
                                             style={fetchedProfilePicture ? {backgroundImage:`url(${baseURL}${fetchedProfilePicture})`} : {backgroundImage:`url(${profileDefault})`}}>

                                                    <input
                                                        id="profile-picture"
                                                        className="img-input"
                                                        type="file"
                                                        onChange={handleChange}
                                                    />
                                        </div>
                                    </div>
                                    <a onClick={() => onClick(profileSettingsEnum.PROFILE)}
                                       data-toggle="tab"
                                       className={"nav-item nav-link has-icon nav-link-faded " + (isActive(profileSettingsEnum.PROFILE) ? 'active' : '')}
                                    >
                                        <SVG name={profileSettingsEnum.PROFILE}/>
                                        <span className='ml-2'>Isiku- ja kontaktandmed</span>
                                    </a>
                                    {/*<a onClick={() => onClick(profileSettingsEnum.SECURITY)} data-toggle="tab"*/}
                                    {/*   className={"nav-item nav-link has-icon nav-link-faded " + (isActive(profileSettingsEnum.SECURITY) ? 'active' : '')}*/}
                                    {/*>*/}
                                    {/*    <SVG name={profileSettingsEnum.SECURITY}/>*/}
                                    {/*    <span className='ml-2'>Turvalisus</span>*/}
                                    {/*</a>*/}
                                    <a onClick={() => onClick(profileSettingsEnum.INVOICE)} data-toggle="tab"
                                       className={"nav-item nav-link has-icon nav-link-faded " + (isActive(profileSettingsEnum.INVOICE) ? 'active' : '')}
                                    >
                                        <SVG name={profileSettingsEnum.INVOICE}/>
                                        <span className='ml-2'>Kuulutused</span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header border-bottom mb-3 d-flex d-md-none">
                                <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
                                    <li className="nav-item">
                                        <a onClick={() => onClick(profileSettingsEnum.PROFILE)}
                                           data-toggle="tab"
                                           className={"nav-link has-icon " + (isActive(profileSettingsEnum.PROFILE) ? 'active' : '')}
                                        >
                                            <SVG name={profileSettingsEnum.PROFILE}/>
                                        </a>
                                    </li>
                                    {/*<li className="nav-item">*/}
                                    {/*    <a onClick={() => onClick(profileSettingsEnum.SECURITY)}*/}
                                    {/*       data-toggle="tab"*/}
                                    {/*       className={"nav-link has-icon " + (isActive(profileSettingsEnum.SECURITY) ? 'active' : '')}*/}
                                    {/*    >*/}
                                    {/*        <SVG name={profileSettingsEnum.SECURITY}/>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}

                                    <li className="nav-item">
                                        <a onClick={() => onClick(profileSettingsEnum.INVOICE)}
                                           data-toggle="tab"
                                           className={"nav-link has-icon " + (isActive(profileSettingsEnum.INVOICE) ? 'active' : '')}
                                        >
                                            <SVG name={profileSettingsEnum.INVOICE}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body tab-content">
                                {getActiveTab()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Profile;
