import {action, thunk} from 'easy-peasy';

const internshipProviderModel = {
    registryCode: '',
    name: '',
    img: '',
    fetchedImage: '',
    email: '',
    phone: '',
    address: '',
    chosenInternshipProvider: '',
    fetchedInternshipProviders: [],
    error: '',
    loading: false,
    inputsValid: false,
    setRegistryCode: action((store, payload) => {
        store.registryCode = payload;
    }),
    setName: action((store, payload) => {
        store.name = payload;
    }),
    setAddress: action((store, payload) => {
        store.address = payload;
    }),
    setImg: action((store, payload) => {
        store.img = payload;
    }),
    setFetchedImage: action((store, payload) => {
        store.fetchedImage = payload;
    }),
    setEmail: action((store, payload) => {
        store.email = payload;
    }),
    setPhone: action((store, payload) => {
        store.phone = payload;
    }),
    setChosenInternshipProvider: action((store, payload) => {
        store.chosenInternshipProvider = payload;
    }),
    setFetchedInternshipProviders: action((store, payload) => {
        store.fetchedInternshipProviders = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setInputsValid: action((store, payload) => {
        store.inputsValid = payload;
    }),
    addInternshipProvider: thunk(async (actions, _payload, {injections, getState}) => {
        const {registryCode, name, email, phone, address, chosenInternshipProvider, img, inputsValid} = getState(state => state.internshipProvider);
        const {api} = injections;
        if (!inputsValid) {
            actions.setError("Ettevõtte andmed on täitmata!")
            return
        }

        const fd = new FormData();

        fd.append('registryCode', registryCode)
        fd.append('name', name)
        fd.append('email', email)
        fd.append('phone', phone)
        fd.append('address', address)
        fd.append('internshipProviderPicture', img)

        actions.setLoading(true)
        await api.addInternshipProvider(fd)
            .then(data => {
                actions.setChosenInternshipProvider(data.id)
            })
            .catch(err => {
                console.log(err)
            })
        if (chosenInternshipProvider) {

        }
        actions.setLoading(false)
    }),
    fetchInternshipProviders: thunk(async (actions, _payload, {injections, getState}) => {
        const {api} = injections;
        actions.setLoading(true)
        await api.getInternshipProviders()
            .then(data => {
                actions.setFetchedInternshipProviders(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        actions.setLoading(false)
    })
};

export default internshipProviderModel;