import React, {useEffect} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import AdvertisementOfferCard from "../components/advertisement/AdvertisementOfferCard";
import CustomLoader from "../components/CustomLoader";


const InternshipProvider = () => {

    const { deals, loading } = useStoreState(state => state.deal);
    const { fetchActiveDeals } = useStoreActions(actions => actions.deal)

    useEffect(() => {
        fetchActiveDeals()
    }, [])

    const DealsView = () => {
        return (
            <div className='row justify-content-center mb-5'>
                {deals && deals.map((value, index) => {
                    return <AdvertisementOfferCard index={index} amount={value.cost} days={value.duration} />
                })}
            </div>
        )
    }

    return (
        <div className='container pt-3'>
            <div className=' text-center'>
                <h2 className='pb-5'>PAKKUMISED</h2>
                {
                    loading
                        ? <CustomLoader />
                        : <DealsView />
                }
            </div>
        </div>
    );
}

export default InternshipProvider;