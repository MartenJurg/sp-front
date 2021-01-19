import { action, thunk } from 'easy-peasy';

const categoryModel = {
    categories: [],
    newCategory: "",
    error: false,
    loading: false,
    setCategories: action((store, payload) => {
        store.categories = payload;
    }),
    setNewCategory: action((store, payload) => {
        store.newCategory = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchAllCategories: thunk(async (actions, _payload, {injections}) => {
        const {api} = injections;

        actions.setLoading(true)
        await api.getAllCategories()
            .then(data => {
                actions.setCategories(data)
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(true)
    }),
    addCategory: thunk(async (actions, _payload, {injections, getState}) => {
        const { newCategory } = getState(state => state.category);

        const {api} = injections;

        actions.setLoading(true)
        await api.addCategory({name: newCategory})
            .then(() => {
                actions.fetchAllCategories()
            })
            .catch(err => {
                console.log(err)
                actions.setError(err)
            })
        actions.setLoading(true)
    })

};

export default categoryModel;