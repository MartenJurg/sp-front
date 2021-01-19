import React, {useState} from "react";
import SelectDropdown from "react-dropdown-select";
import {useStoreActions, useStoreState} from "easy-peasy";
import Button from "react-bootstrap/Button";
import { Search } from 'react-bootstrap-icons';

const AdvertisementHeader = () => {
    const [chosenCategories, setChosenCategories] = useState([]);
    const { fetchAds } = useStoreActions(actions => actions.advertisement)
    const { categories } = useStoreState(state => state.category)

    const getOptions = () => { return categories.map(function(obj) {return {label: obj.name, value: obj.id}}) }

    const handleChange = values => {
        setChosenCategories(values)
    }

    const handleClick = () => {
        fetchAds(chosenCategories)
    }

    return (
        <div className='ad-header row justify-content-center'>
            <div className='h3 w-100 text-center pb-3'>
                PRAKTIKAPAKKUMISED
            </div>
            <br/>
            <div className='col-8'>
                <SelectDropdown
                    placeholder='Kategooriad'
                    className='w-100'
                    options={getOptions()}
                    onChange={handleChange}
                    multi
                />
            </div>
            <Button className="button-basic m-0  p-2 pr-3 pl-3 shadow-sm" onClick={handleClick}>
                <Search/>
            </Button>
        </div>
    );
}

export default AdvertisementHeader;