import React from "react";
import {action, thunk} from "easy-peasy";
import { profileSettingsEnum } from '../Constants'

const profileModel = {
    personalData: '',
    name: '',
    email: '',
    phone: '',
    bio: '',
    linkedInUrl: '',
    selectedCvFile: null,
    fetchedCvFile: null,
    fetchedProfilePicture: null,
    loading: false,
    error: '',
    activeTab: profileSettingsEnum.PROFILE,
    setPersonalData: action((state, payload) => {
        state.personalData = payload
    }),
    setName: action((state, payload) => {
        state.name = payload
    }),
    setEmail: action((state, payload) => {
        state.email = payload
    }),
    setPhone: action((state, payload) => {
        state.phone = payload
    }),
    setBio: action((state, payload) => {
        state.bio = payload
    }),
    setLinkedInUrl: action((state, payload) => {
        state.linkedInUrl = payload
    }),
    setLoading: action((state, payload) => {
        state.loading = payload
    }),
    setError: action((state, payload) => {
        state.error = payload
    }),
    setActiveTab: action((state, payload) => {
        state.activeTab = payload
    }),
    setSelectedCvFile: action((state, payload) => {
        state.selectedCvFile = payload
    }),
    setFetchedCvFile: action((state, payload) => {
        state.fetchedCvFile = payload
    }),
    setFetchedProfilePicture: action((state, payload) => {
        state.fetchedProfilePicture = payload
    }),
    fetchPersonalData: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const { api } = injections;

        actions.setLoading(true);
        await api.getPersonalData()
            .then(data => {
                actions.setPersonalData(data)
                if (data.full_name) {
                    actions.setName(data.full_name)
                }
                if (data.about) {
                    actions.setBio(data.about)
                }
                if (data.phone) {
                    actions.setPhone(data.phone)
                }
                if (data.linkedInUrl) {
                    actions.setLinkedInUrl(data.linkedInUrl)
                }
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false);
    }),
    fetchCV: thunk(async (actions, payload, {injections}) => {
        const { api } = injections;

        await api.getCV()
            .then(data => {
                actions.setFetchedCvFile(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }),
    updatePersonalData: thunk(async (actions, payload, {injections, getState}) => {
        const { selectedCvFile, personalData, name, phone, bio, linkedInUrl } = getState(state => state.profile);
        const { api } = injections;

        const dto = {
            full_name: personalData.full_name === name ? null : name,
            phone: personalData.phone === phone ? null : phone,
            about: personalData.about === bio ? null : bio,
            linkedInUrl: personalData.linkedInUrl === linkedInUrl ? null : linkedInUrl
        }

        actions.setLoading(true)
        await api.updatePersonalData(dto)
            .then(data => {
                console.log("success")
            })
            .catch(err => {
                console.log(err)
            })

        if (selectedCvFile) {
            actions.setLoading(true)
            const fd = new FormData();
            fd.append('cv', selectedCvFile)
            await api.updateCV(fd)
                .then(data => {
                    actions.setFetchedCvFile(data)
                })
                .catch(err => {
                    console.log(err)
                })
            actions.setSelectedCvFile(null)
            actions.setLoading(false)
        } else {
            actions.setLoading(false)
        }
    }),
    fetchProfilePicture: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.getProfilePicture()
            .then(data => {
                actions.setFetchedProfilePicture(data)
            })
            .catch(err => {
                console.log(err)
            })
        actions.setLoading(false)
    }),
    addProfilePicture: thunk(async (actions, payload, {injections, getState, getStoreActions}) => {
        const { api } = injections;
        const fd = new FormData();
        fd.append('profilePicture', payload)
        await api.addProfilePicture(fd)
            .then(data => {
                actions.setFetchedProfilePicture(data)
            })
            .catch(err => {
                console.log(err)
            })
    }),
};

export default profileModel;