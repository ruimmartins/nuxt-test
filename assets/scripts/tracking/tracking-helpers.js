/* import { store } from '../store'
import { getChangedFields } from '@/helpers' */
import { trackingEvents } from './tracking-events'
/* import { NETWORK_STATE_SUCCESS } from "@/network"
import { ROUTENAMES } from "@/routeNames" */

let calls = 0
const attempts = 30

const excludedRoutes = [
    '/firmenprofil',
    '/account',
    '/account/settings'
]

const isModuleLoaded = (module) => store.getters[`${module}/getNetworkState`] === NETWORK_STATE_SUCCESS

/**
 * Pushes a event into GTM
 *
 * @param obj
 */
export const gtmTrackEvent = (event, params = {}) => {
    //trying to prevent integration tests from being tracked
    /* const email = store.state.userModule.user && store.state.userModule.user.attributes['email'] || ''
    if(email && email.startsWith('it-') && email.endsWith('@sellwerk.digital')) return */

    let obj = { ...trackingEvents[event], ...params }

    if(!Object.keys(obj).length) return

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(obj);
    /* console.log(window.dataLayer) */
}

export const gtmTrackPageView = (to) => {
    if(excludedRoutes.includes(to.path)) return false

    const uid = store.getters['userModule/getUserId']
    const contactId = store.getters['userModule/getContactId']

    const pageType = to.path === '/' && uid ? 'Activity Stream' : to.meta.trackingName
    const pageName = to.name
    const environment = app_data.production ? "production" : "staging"
    const loginStatus = uid ? "logged in" : "logged out"

    let obj = { pageName, pageType, environment, loginStatus }

    if(uid || contactId){
        obj = {
            ...obj,
            userID: uid || contactId,
            userLanguage: "DE"
        }
    }

    if(uid && isModuleLoaded('masterDataModule') && isModuleLoaded('companyModule')){

        const { gelebterName, companyId, industry, address } = store.state.companyModule
        const isProfilePublished = store.getters['companyModule/getProfilePublished']
        const industryId = industry && industry.industryId || null
        const industryName = store.getters["masterDataModule/industry"](industryId)

        obj = {
            ...obj,
            accountType: isProfilePublished ? 'public' : 'only sellwerk',
            companyID: companyId || undefined,
            companyName: gelebterName || undefined,
            companyCountry: "DE",
            companyIndustry: industryName && industryName.name || undefined,
            companyCity: address && address.city || undefined,
            companyZIP: address && address.zipCode || undefined,
        }

        if([ROUTENAMES.LISTING, ROUTENAMES.LISTING_OVERVIEW, ROUTENAMES.LISTING_ANALYSIS, ROUTENAMES.LISTING_DUPLICATES].includes(to.name)){

            if(isModuleLoaded('listingModule')){
                const listingStatus = store.getters["listingModule/getListingPlatformsStatus"]

                obj = {
                    ...obj,
                    listingActive: listingStatus.active.value,
                    listingWarnings: listingStatus.warning.value,
                    listingSyncing: listingStatus.syncing.value,
                }
            }else if(calls <= attempts){
                calls++
                setTimeout(() => { gtmTrackPageView(to) }, 100)
                return false
            }
        }
    }else if(calls <= attempts){
        calls++
        setTimeout(() => { gtmTrackPageView(to) }, 100)
        return false
    }

    calls = 0
    gtmTrackEvent("pageView", obj)
}

/**
 * Object with a set of functions to track each profile block saved data 
 *
 * @param data - changed data
 * @param origData - original data
 */

export const trackProfileSaveEvent = {
    generic: (data, origData) => {
        let changed = getChangedFields(data, origData)
        gtmTrackEvent('profileChangeBusinessInformation', { formFieldName: changed })
    },
    socialmedia: (data, origData) => {
        let changed = getChangedFields(data, origData)
        let removed = origData.socialLinks === null ? [] : Object.keys(origData.socialLinks).filter((item) => {
            return data.socialLinks === null ? origData.socialLinks[item] !== null : !Object.keys(data.socialLinks).includes(item)
        })
        if(changed.length) gtmTrackEvent("profileSocialMediaAdd", { socialMediaNetworks: changed})
        if(removed.length) gtmTrackEvent("profileSocialMediaRemove", { socialMediaNetworks: removed})
    },
    about: (data, origData) => {
        let changed = getChangedFields(data, origData)
        gtmTrackEvent("profileSaveAbout", { formFieldName: changed })
    },
    video: (data, origData) => {
        let changed = getChangedFields(data, origData)
        if(changed.length > 1){
            gtmTrackEvent("profileVideoAdd")
        }else{
            gtmTrackEvent("profileVideoRemove")
        }
        gtmTrackEvent("profileSaveVideo")
    },
    gallery: (data, origData) => {
        let changed = getChangedFields(data, origData)
        let removed = origData.galleryImageIds.filter((item) => { return !data.galleryImageIds.includes(item)})
        removed.forEach(() => { gtmTrackEvent("profilePhotoRemoved") })
        changed.forEach(() => { gtmTrackEvent("profilePhotoAdd") })
        gtmTrackEvent("profileSaveGallery")
    },
    keywords: (data, origData) => {
        let changed = data.keywords.filter((item) => !origData.keywords.includes(item))
        let removed = origData.keywords.filter((item) => !data.keywords.includes(item))
        removed.forEach((keyword) => { gtmTrackEvent("profileKeywordRemove", { keyword: keyword }) })
        changed.forEach((keyword) => {
            let type = "free text"
            let find = origData.possibleKeywords.find((item) => item === keyword)
            if(find) type = "recommendation"
            gtmTrackEvent("profileKeywordAdd", { keywordAddType: type, keyword: keyword})
        })
    },
    highlights: (data, origData) => {
        let changed = getChangedFields(data, origData)
        let removed = []
        changed.forEach((key) => { if(!data[key]) removed.push(key) })
        let added = changed.filter((item) => { return !removed.includes(item)})
        if(added.length){
            gtmTrackEvent("profileHighlightsAdd", { highlightType: added })
        }
        if(removed.length){
            gtmTrackEvent("profileHighlightsRemove", { highlightType : removed })
        }
    },
    badges: (data, origData) => {
        let changed = getChangedFields(data, origData)
        let removed = Object.keys(origData.getBadges).filter((item) => { return !data.badges[item]})
        removed.forEach(() => { gtmTrackEvent("profileBadgesRemove") })
        changed.forEach((badge) => { if(badge === 'imageId') gtmTrackEvent("profileBadgesAdd") })
    },
    openingHours:() => {
        gtmTrackEvent("profileSaveOpeningHours")
    },
    trainings:(data, origData) => {
        gtmTrackEvent("profileSaveApprenticeship")
        let changed = getChangedFields(data, origData)
        let added = []
        changed.forEach((item) => {
            if(item === "title") added.push([])
            added[added.length-1].push(item)
        })
        added.forEach((elements) => gtmTrackEvent("profileApprenticeshipAdd", { apprenticeshipElement : elements }))
    },
    additionalInfo: (data, origData) => {
        gtmTrackEvent("profileSaveAdditionalInfo")

        for(const key of Object.keys(data)){
            const changed = data[key].filter(val => !origData[key].includes(val))

            if (!changed.length) { continue }

            switch (key) {
                case "languages":
                    gtmTrackEvent("profileLanguageAdd", { language : changed })
                    break;
                case "paymentOptions":
                    gtmTrackEvent("profilePaymentAdd", { paymentOption : changed })
                    break;
                case "accessibility":
                    gtmTrackEvent("profileAccessSymbolAdd", { accessSymbol : changed })
                    break;
            }
        }
    }
}