import axios from 'axios';
import {
    baseURL,
    loginURL,
    registerURL,
    tokenURL,
    profileURL,
    cvURL,
    dealURL,
    internshipProviderURL,
    advertisementURL,
    categoryURL,
    invoiceURL,
    candidatureURL
} from "../Constants";

const api = {};
api.fetch = opts => axios
    .request({
        ...opts,
            baseURL: opts.baseURL || baseURL,
            mode: 'no-cors'

    })
    .then(response => response.data);



api.login = params => api.fetch({url: `${loginURL}`, data: params, method: 'POST'});
api.register = params => api.fetch({url: `${registerURL}`, data: params, method: 'POST'});
api.fetchToken = () => api.fetch({url: `${tokenURL}`, method: 'GET'});

api.getPersonalData = () => api.fetch({url: `${profileURL}/personal`, method: 'GET'});
api.updatePersonalData = params => api.fetch({url: `${profileURL}/personal`, data: params, method: 'PUT'});
api.getProfilePicture = () => api.fetch({url: `${profileURL}/picture`, method: 'GET'});
api.addProfilePicture = params => api.fetch({url: `${profileURL}/picture`, data: params, method: 'PUT'});

api.updateCV = params => api.fetch({url: `${cvURL}`, data: params, method: 'PUT',});
api.getCV = () => api.fetch({url: `${cvURL}`, method: 'GET'});

api.getAllDealStatuses = () => api.fetch({url: `${dealURL}/status`, method: 'GET'});
api.getAllDeals = () => api.fetch({url: `${dealURL}/all`, method: 'GET'});
api.getActiveDeals = () => api.fetch({url: `${dealURL}/active`, method: 'GET'});
api.addDeal = params => api.fetch({url: `${dealURL}`, params, method: 'POST'});
api.updateDeal = params => api.fetch({url: `${dealURL}`, params, method: 'PUT'});

api.addInternshipProvider = params => api.fetch({url: `${internshipProviderURL}`, data: params, method: 'POST'});
api.getInternshipProviderImg = params => api.fetch({url: `${internshipProviderURL}/picture`, params, method: 'GET'});
api.getInternshipProviders = () => api.fetch({url: `${internshipProviderURL}`, method: 'GET'});

api.addAdvertisement = params => api.fetch({url: `${advertisementURL}`, data: params,  method: 'POST'});
api.getUserAdvertisements = () => api.fetch({url: `${advertisementURL}/user`, method: 'GET'});
api.getAllActiveAdvertisements = params => api.fetch({url: `${advertisementURL}/active`, method: 'GET', params});
api.getActiveAdvertisements = params => api.fetch({url: `${advertisementURL}`, method: 'GET', params});

api.getAllCategories = () => api.fetch({url: `${categoryURL}/all`, method: 'GET'});
api.addCategory = params => api.fetch({url: `${categoryURL}`, params, method: 'POST'});

api.getAllInvoices = () => api.fetch({url: `${invoiceURL}`, method: 'GET'})
api.getInvoice = params => api.fetch({url: `${invoiceURL}/by-advertisement/${params.advertisementId}`, method: 'GET'})
api.getNotPaidInvoices = () => api.fetch({url: `${invoiceURL}/not-paid`, method: 'GET'})
api.getPaidInvoices = () => api.fetch({url: `${invoiceURL}/paid`, method: 'GET'})
api.markInvoiceAsPaid = params => api.fetch({url: `${invoiceURL}/paid/${params.invoiceId}`, method: 'PATCH'})

api.addCandidature = params => api.fetch({url: `${candidatureURL}/${params.advertisementId}`, method: "POST"})
api.addVanillaCandidature = params => api.fetch({url: `${candidatureURL}/vanilla`, data: params, method: 'POST'})
api.getCandidature = params => api.fetch({url: `${candidatureURL}/${params.advertisementId}`, method: 'GET'})
api.getVanillaCandidature = params => api.fetch({url: `${candidatureURL}/vanilla/${params.advertisementId}`, method: 'GET'})

export default api;