import {action, computed, thunk} from "easy-peasy";
import setAuthHeader from "../utils/setAuthHeader";

const registerModel = {
    email: '',
    password: '',
    repeatedPassword: '',
    successful: false,
    passwordMatches: computed(state => state.password === state.passwordRepeat),
    loading: false,
    error: '',
    invalidInputErrorMessage: '',
    setEmail: action((store, payload) => {
        store.email = payload;
    }),
    setPassword: action((store, payload) => {
        store.password = payload;
    }),
    setRepeatedPassword: action((store, payload) => {
        store.repeatedPassword = payload;
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
    register: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const { email, password } = getState(state => state.register);
        const { setToken } = getStoreActions().token;
        const { api } = injections;

        actions.setLoading(true);
        await api.register({email: email, password: password})
            .then(data => {
                console.log(data.token)
                setAuthHeader(data.token);
                setToken(data.token);
                localStorage.setItem('token', data.token)
                actions.setSuccessful(true);
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false);
    }),
};

export default registerModel;