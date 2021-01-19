import React from "react";

export const isDev = process.env.NODE_ENV === 'development';
export const origin = window && window.location && window.location.origin;

export const baseURL = isDev ? 'http://localhost:80' : origin;
export const loginURL = '/api/auth/login';
export const registerURL = '/api/auth/register';
export const tokenURL = '/api/tokenUrl';
export const profileURL = '/api/profile';
export const cvURL = '/api/profile/cv';
export const dealURL = '/api/deal';
export const internshipProviderURL = '/api/internship_provider';
export const advertisementURL = '/api/advertisements';
export const categoryURL = '/api/category';
export const invoiceURL = '/api/invoices';
export const candidatureURL = '/api/candidature';

export const topics = [
    'ÕIGUS',
    'IT',
    'EHITUS/KINNISVARA',
    'MEEDIA',
    'TEENINDUS/TOITLUSTUS',
    'MÜÜK- JA TURUNDUS',
    'MEDITSIIN',
    'FINANTS',
    'LOGISTIKA',
    'KULTUUR/MEELELAHUTUS',
    'TEHNIKA/MEHHAANIKA'
]

export const deals = [
    {
        'amount': 0,
        'days': 30,
        'valid': 'Valid for one month'
    },
    {
        'amount': 0,
        'days': 90,
        'valid': 'Valid for three months'
    }
]

export const profileSettingsEnum = {
    PROFILE: 'profile',
    SECURITY: 'security',
    INVOICE: 'invoices'
}