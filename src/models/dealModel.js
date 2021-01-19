import { action, thunk } from 'easy-peasy';

const dealModel = {
    deals: [],
    statuses: [],
    chosenDeal: '',
    price: '',
    duration: '',
    error: false,
    loading: false,
    setDeals: action((store, payload) => {
        store.deals = payload;
    }),
    setStatuses: action((store, payload) => {
        store.statuses = payload;
    }),
    setPrice: action((store, payload) => {
        store.price = payload;
    }),
    setDuration: action((store, payload) => {
        store.duration = payload;
    }),
    setChosenDeal: action((store, payload) => {
        store.chosenDeal = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchAllDeals: thunk(async (actions, _payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.getAllDeals()
            .then(data => {
                actions.setDeals(data)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)

    }),
    fetchActiveDeals: thunk(async (actions, _payload, { injections }) => {
            const { api } = injections;

        actions.setLoading(true)
        await api.getActiveDeals()
                .then(data => {
                    actions.setDeals(data)
                })
                .catch(err => {
                    console.log(err)
                })
        actions.setLoading(false)

    }),
    addNewDeal: thunk(async (actions, _payload, { injections, getState }) => {
        const { api } = injections;
        const { price, duration } = getState(state => state.deal);

        actions.setLoading(true)
        await api.addDeal({cost: price, duration: duration})
            .then(() => {
                actions.fetchAllDeals()
            })
            .catch(err => {
                console.log(err)
            })
        actions.setLoading(false)

    }),
    updateDeal: thunk(async (actions, _payload, { injections, getState }) => {
        const { api } = injections;
        const { chosenDeal } = getState(state => state.deal);

        actions.setLoading(true)
        await api.updateDeal({dealId: chosenDeal, statusId: _payload})
            .then(() => {
                actions.fetchAllDeals()
            })
            .catch(err => {
                console.log(err)
            })
        actions.setLoading(false)

    }),
    fetchStatuses: thunk(async (actions, _payload, { injections }) => {
        const { api } = injections;

        await api.getAllDealStatuses()
            .then(data => {
                actions.setStatuses(data)
            })
            .catch(err => {
                console.log(err)
            })
    }),

};

export default dealModel;