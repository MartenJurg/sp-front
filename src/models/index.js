import tokenModel from './tokenModel';
import registerModel from './registerModel';
import loginModel from "./loginModel";
import advertisementModel from "./advertisementModel";
import advertisementOfferModel from "./advertisementOfferModel";
import profileModel from "./profileModel";
import dealModel from "./dealModel";
import categoryModel from "./categoryModel";
import internshipProviderModel from "./internshipProviderModel";
import invoiceModel from "./invoiceModel";
import candidateModel from "./candidateModel";

const storeModel = {
    token: tokenModel,
    register: registerModel,
    login: loginModel,
    advertisementOffer: advertisementOfferModel,
    advertisement: advertisementModel,
    profile: profileModel,
    deal: dealModel,
    internshipProvider: internshipProviderModel,
    category: categoryModel,
    invoice: invoiceModel,
    candidate: candidateModel
}

export default storeModel;