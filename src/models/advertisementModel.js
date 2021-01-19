import React from "react";
import {action, thunk} from "easy-peasy";

const advertisementModel = {
    ads: [],
    categories: [],
    loading: false,
    error: '',
    fetchedCategories: [],
    chosenAdvertisement: '',
    showModal: false,
    setAds: action((store, payload) => {
        store.ads = payload;
    }),
    setCategories: action((store, payload) => {
        store.categories = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setFetchedCategories: action((store, payload) => {
        store.fetchedCategories = payload;
    }),
    setChosenAdvertisement: action((store, payload) => {
        store.chosenAdvertisement = payload;
    }),
    setShowModal: action((store, payload) => {
        store.showModal = payload;
    }),
    fetchAds: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const { api } = injections;
        console.log("uuendus laks labi!")

        actions.setLoading(true)
        if (payload && payload.length > 0) {
            let dto = {categories: payload.map(function(obj) {return +obj.value})+''}
            console.log(dto)
            await api.getActiveAdvertisements(dto)
                .then(data => {
                    actions.setAds(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                    actions.setError(err)
                })

        } else {
            await api.getAllActiveAdvertisements()
                .then(data => {
                    actions.setAds(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                    actions.setError(err)
                })
        }
        actions.setLoading(false)

    }),
    fetchUserAds: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.getUserAdvertisements()
            .then(data => {
                actions.setAds(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        actions.setLoading(false)
    }),
}

export default advertisementModel;