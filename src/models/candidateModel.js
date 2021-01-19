import { action, thunk } from 'easy-peasy';

const candidateModel = {
    candidature: [],
    vanillaCandidature: [],
    successful: false,
    error: false,
    loading: false,
    vanillaEmail: '',
    vanillaCv: '',
    vanillaLinkedin: '',
    setSuccessful: action((store, payload) => {
        store.successful = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setVanillaCv: action((store, payload) => {
        store.vanillaCv = payload;
    }),
    setVanillaEmail: action((store, payload) => {
        store.vanillaEmail = payload;
    }),
    setVanillaLinkedin: action((store, payload) => {
        store.vanillaLinkedin = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setCandidature: action((store, payload) => {
        store.candidature = payload;
    }),
    setVanillaCandidature: action((store, payload) => {
        store.vanillaCandidature = payload;
    }),
    addCandidature: thunk(async (actions, _payload, {injections}) => {
        const {api} = injections;
        actions.setLoading(true)
        await api.addCandidature({advertisementId: _payload})
            .then(() => {
                actions.setSuccessful(true)
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    addVanillaCandidature: thunk(async (actions, _payload, {injections, getState}) => {
        const {api} = injections;
        const { vanillaEmail, vanillaCv, vanillaLinkedin } = getState(state => state.candidate);

        actions.setLoading(true)
        const fd = new FormData();
        fd.append('advertisementId', _payload.toString())
        fd.append('email', vanillaEmail)
        fd.append('cv', vanillaCv)
        fd.append('linkedin', vanillaLinkedin)
        await api.addVanillaCandidature(fd)
            .then(() => {
                actions.setSuccessful(true)
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    fetchCandidates: thunk(async (actions, _payload, {injections, getState}) => {
        const {api} = injections;

        actions.setLoading(true)

        await api.getCandidature({advertisementId: _payload})
            .then(candidature => {
                actions.setCandidature(candidature)
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    fetchVanillaCandidates: thunk(async (actions, _payload, {injections, getState}) => {
        const {api} = injections;

        actions.setLoading(true)

        await api.getVanillaCandidature({advertisementId: _payload})
            .then(vanillaCandidature => {
                actions.setVanillaCandidature(vanillaCandidature)
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(false)
    })


};

export default candidateModel;