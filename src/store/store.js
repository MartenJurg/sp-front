import { createStore } from 'easy-peasy';
import model from '../models';
import api from '../api';

const store = createStore(model, {
    // Votsin töö projektist ja ei saa tapselt aru kas meil seda vaja xd
    // compose: composeWithDevTools({
    //     serialize: {
    //         replacer: (key, value) =>
    //             value && value instanceof Date
    //                 ? value.toLocaleDateString('et-EE')
    //                 : value
    //     }
    // }),
    injections: { api: api }
});
window.store = store;

export default store;