import { action, thunk } from 'easy-peasy';
import setAuthHeader from '../utils/setAuthHeader';

const tokenModel = {
    token: '',
    error: false,
    loading: false,
    strongAuth: false,
    setStrongAuth: action((store, payload) => {
        store.strongAuth = payload;
    }),
    setToken: action((store, payload) => {
        store.token = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    checkToken: action((store) => {
        store.token = localStorage.getItem('token') || '';
        if (store.token !== '') {
            setAuthHeader(store.token)
        }
    }),
    fetchToken: thunk(
        async (actions, _payload, { injections }) => {
            const { api } = injections;
            console.log("FETCHING TOKEN")
            // actions.setLoading(true);
            // actions.setError(false);
            // await api
            //     .fetchToken()
            //     .then(token => {
            //         const { access_token } = token;
            //         actions.setToken(token);
            //         setAuthHeader(access_token);
            //     })
            //     .catch(err => {
            //         actions.setError(err.message);
            //     });
            // actions.setLoading(false);
        }
    )

};

export default tokenModel;