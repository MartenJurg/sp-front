import React from "react";
import Button from 'react-bootstrap/Button'
import {useStoreActions} from "easy-peasy";
import { Spring } from "react-spring/renderprops-universal";
import {baseURL, isDev} from "../../Constants";
import profileDefault from '../../resources/images/internship-provider-default-image.png'

const AdvertisementCard = props => {

    const { setChosenAdvertisement, setShowModal } = useStoreActions(actions => actions.advertisement)
    const { setError, setSuccessful } = useStoreActions(actions => actions.candidate)

    const handleClick = () => {
        setError(false)
        setSuccessful(false)
        setChosenAdvertisement(props.advertisement)
        setShowModal(true)
    }

    const getTitle = () => {
        return props.advertisement.title
    }

    const getInternshipProviderName = () => {
        return props.advertisement.internshipProvider.name
    }

    const getImg = () => {
        if (isDev) {
            return require('../../resources/images/internship-provider-default-image.png')
        } else {
            return props && props.advertisement && props.advertisement.internshipProvider && props.advertisement.internshipProvider.image
                ? baseURL + props.advertisement.internshipProvider.image
                : profileDefault
        }
    }

    return (
        <Spring
            from={{opacity: 0}}
            to={{opacity: 1}}
        >

            {props =>(
                <div  style={props} className='col-10 col-sm-8 col-md-5 col-lg-3 col-xl-3 border m-4 p-0 bg-white '>
                    <div className='row justify-content-center p-0'>

                        <img
                            alt=""
                            width="290"
                            src={getImg()}
                            className="d-inline-block align-top col-12 m-0 ad-img"
                        />
                    </div>
                    <div className='m-4 '>
                        <p className="ml-2 pb-3 h5 advertisement-text">{getTitle()}</p>
                        <div className='ml-2 pb-3'>{getInternshipProviderName()}</div>
                        <hr />
                        {}
                        <Button className='button-basic shadow-none mt-3' onClick={handleClick}>Vaata</Button>
                    </div>
                </div>
            )}
        </Spring>
    )
}

export default AdvertisementCard;