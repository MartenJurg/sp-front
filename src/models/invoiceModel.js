import {action, thunk} from "easy-peasy";

const invoiceModel = {
    invoices: [],
    notPaidInvoices: [],
    paidInvoices: [],
    chosenInvoice: '',
    loading: false,
    error: '',
    setInvoices: action((store, payload) => {
        store.invoices = payload;
    }),
    setNotPaidInvoices: action((store, payload) => {
        store.notPaidInvoices = payload;
    }),
    setPaidInvoices: action((store, payload) => {
        store.paidInvoices = payload;
    }),
    setChosenInvoice: action((store, payload) => {
        store.chosenInvoice = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    fetchAllInvoices: thunk(async (actions, payload, {injections}) => {
        const { api } = injections;

       actions.setLoading(true)
        api.getAllInvoices()
            .then(data => {
                console.log(data)
                actions.setInvoices(data)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    fetchNotPaid: thunk(async (actions, payload, {injections}) => {
        const { api } = injections;

        actions.setLoading(true)
        api.getNotPaidInvoices()
            .then(data => {
                console.log(data)
                actions.setNotPaidInvoices(data)
                actions.fetchPaid()
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    fetchPaid: thunk(async (actions, payload, {injections}) => {
        const { api } = injections;

        actions.setLoading(true)
        api.getPaidInvoices()
            .then(data => {
                console.log(data)
                actions.setPaidInvoices(data)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    markInvoiceAsPaid: thunk(async (actions, payload, {injections}) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.markInvoiceAsPaid({invoiceId: payload})
            .then(data => {
                console.log(data)
                actions.fetchNotPaid()
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)

    }),
};

export default invoiceModel;