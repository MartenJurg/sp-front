import React from "react";
import {action, thunk} from "easy-peasy";

const advertisementOfferModel = {
    responseAdvertisement: '',
    chosenCategories: [],
    title: '',
    img: '',
    body: '',
    deal: '',
    internshipProvider: '',
    loading: false,
    error: '',
    successful: null,
    invoice: '',
    setResponseAdvertisement: action((store, payload) => {
        store.responseAdvertisement = payload;
    }),
    setChosenCategories: action((store, payload) => {
        store.chosenCategories = payload;
    }),
    setTitle: action((store, payload) => {
        store.title = payload;
    }),
    setImg: action((store, payload) => {
        store.img = payload;
    }),
    setDeal: action((store, payload) => {
        store.deal = payload;
    }),
    setInternshipProvider: action((store, payload) => {
        store.internshipProvider = payload;
    }),
    setBody: action((store, payload) => {
        store.body = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setSuccessful: action((store, payload) => {
        store.successful = payload;
    }),
    setInvoice: action((store, payload) => {
        store.invoice = payload;
    }),
    addAdvertisement: thunk(async (actions, payload, {injections, getState}) => {
        const { chosenCategories, title, img, body, internshipProvider, deal } = getState(state => state.advertisementOffer);
        const { api } = injections;

        if (internshipProvider === '') {
            actions.setError("Ettevõte on valimata")
            return
        }

        const fd = new FormData();
        fd.append('companyId', internshipProvider)
        fd.append('title', title)
        fd.append('categories', chosenCategories && chosenCategories.map(function(obj) {return +obj.value}))
        fd.append('img', img)
        fd.append('description', body)
        fd.append('deal', deal.id)


        actions.setLoading(true)
        await api.addAdvertisement(fd)
            .then(data => {
                actions.setResponseAdvertisement(data)
                actions.setSuccessful(true)

                api.getInvoice({advertisementId: data.id})
                    .then(invoice => {
                        actions.setInvoice(invoice.pdfFile)
                    })
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(false)
    })
}

export default advertisementOfferModel;