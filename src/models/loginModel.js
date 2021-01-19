import {action, thunk} from "easy-peasy";
import setAuthHeader from "../utils/setAuthHeader";

const loginModel = {
    email: '',
    password: '',
    successful: false,
    loading: false,
    error: '',
    invalidInputErrorMessage: '',
    setEmail: action((store, payload) => {
        store.email = payload;
    }),
    setPassword: action((store, payload) => {
        store.password = payload;
    }),
    setSuccessful: action((store, payload) => {
        store.successful = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setInvalidInputErrorMessage: action((store, payload) => {
        store.invalidInputErrorMessage = payload;
    }),
    login: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const {email, password} = getState(state => state.login);
        const {setToken} = getStoreActions().token;
        const {api} = injections;

        actions.setLoading(true);
        await api.login({email: email, password: password})
            .then(data => {
                console.log(data)
                setAuthHeader(data.token);
                setToken(data.token);
                localStorage.setItem('token', data.token)
                actions.setSuccessful(true)
            })
            .catch(x => {
                console.log(x)
                actions.setError(x);
            })
        actions.setLoading(false);
    })
};

export default loginModel;