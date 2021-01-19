import React from "react";
import Button from 'react-bootstrap/Button'
import {useStoreActions, useStoreState} from "easy-peasy";
import { useHistory } from 'react-router-dom';

const AdvertisementOfferCard = props => {
    const { deals } = useStoreState(state => state.deal)
    const { setChosenDeal } = useStoreActions(actions => actions.deal)
    const { token } = useStoreState(state => state.token);
    const history = useHistory();

    const onClick = index => {
        setChosenDeal(deals[index])
        if (token === '' ) history.push("/sisene");
        history.push("/praktikapakkujale/kuulutus")

    }

    return (
        <div className='col-9 col-sm-9 col-md-5  border m-4 p-4 offer-card bg-white'>
            <div className='offer-card-inner'>
                <h4 className='ad-header'>
                    LISA KUULUTUS
                </h4>
                <div className='pt-3 offer-price'>
                    <span  >{props.amount}€</span>
                </div>
                <p className='pt-2 m-2'>
                    {props.days} päeva
                </p>
                <Button
                    className='button-basic shadow-none w-75 mt-2'
                    onClick={() => onClick(props.index)}
                >
                    Telli
                </Button>
            </div>
        </div>
    )
}

export default AdvertisementOfferCard;