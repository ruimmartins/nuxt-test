export const copyValue = (value) => {
    if(typeof value === 'object') {
        // Convert observer to plain object
        return JSON.parse(JSON.stringify(value))
    } else {
        return value
    }
}

/**
 * Returns the value parameter by value/copy.
 * Return false when value === false, null for other falsy values or a copy of the object/array
 */
export const copyValueOrNull = (value) => {
    if(value === false) {
        return false
    } else if(typeof value === 'object') {
        // Convert observer to plain object
        return JSON.parse(JSON.stringify(value))
    } else {
        return !value ? null : value
    }
}

export const getFullUrl = (url) => {
    if(!url) {
        return '#'
    }

    if(url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
        return url
    } else {
        return `https://${url}`
    }
}

export const getReadableUrl = (url) => {
    if(!url) {
        return '#'
    }

    return url.replace('https://', '').replace('http://', '')
}

export const getMutationName = (field, prefix = 'update') => (prefix + field.substr(0, 1).toUpperCase() + field.substr(1))

export const getCompanyImageUrl = (companyId, imageId) => {
    if (!companyId || !imageId) {
        return false
    }

    // eslint-disable-next-line
    return `${app_data.backend_images_endpoint}/companyimages/${companyId}/${imageId}-original`
}

export const getCompanyShortName = (companyName) => {
    if(companyName){
        let name = companyName.split(" ")
        return name[1] ? name[0].substr(0,1).toUpperCase() + name[1].substr(0,1).toUpperCase() : name[0].substr(0,2).toUpperCase()
    }
    else{
        return ""
    }
}

export const extractYouTubeID = (urlOrEmbedCode) => {
    urlOrEmbedCode = urlOrEmbedCode.replace(/([><])/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

    if(urlOrEmbedCode[2] !== undefined) {
        return urlOrEmbedCode[2].split(/[^0-9a-z_-]/i)[0]
    } else {
        return false
    }
}

export const extractVimeoID = (urlOrEmbedCode) => {
    const match = urlOrEmbedCode.match(/vimeo\.com\/(?:video\/)?([0-9]+)/)

    if(match !== null) {
        return match[1]
    } else {
        return false
    }
}

export const convertVideoToLink = (video) => {
    if(!video) {
        return ''
    }

    const { videoId, hoster } = video


    switch(hoster) {
        case 'youtube':
            return `https://youtu.be/${videoId}`

        case 'vimeo':
            return `https://vimeo.com/${videoId}`

        default:
            return ''
    }
}

export const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1])
    else
        byteString = unescape(dataURI.split(',')[1])

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], {type:mimeString})
}

export const pad = (n) => n.toString().padStart(2, '0')

export const isOpen24Hours = ({fromHour, fromMinute, toHour, toMinute}) => {
    return fromHour === 0 && fromMinute === 0 &&
        (
            (toHour === 0 && toMinute === 0) ||
            (toHour === 23 && toMinute === 59) ||
            (toHour === 24 && toMinute === 0)
        )
}

export const stubDatesFromTimespan = (timeSpan, stubDay = 1) => {
    let {fromHour, fromMinute, toHour, toMinute} = timeSpan
    let dateFrom = new Date(`01/${pad(stubDay)}/2000`)
    dateFrom.setHours(fromHour, fromMinute)
    let dateTo = new Date(`01/${pad(stubDay)}/2000`)
    dateTo.setHours(toHour, toMinute)

    // if the to date is after the from date, it means it is on the next day
    if(dateTo <= dateFrom) {
        dateTo.setDate(pad(stubDay + 1))
        dateTo.setHours(toHour, toMinute)
    }

    return [dateFrom, dateTo]
}

export const stubDatesFromDay = ({info, timeSpans}, stubDay = 1) => {
    if(info !== 'CLOSED' && timeSpans && timeSpans.length) {
        if (isOpen24Hours(timeSpans[0])) {
            let dateFrom = new Date(`01/${pad(stubDay)}/2000`)
            let dateTo = new Date(`01/${pad(stubDay + 1)}/2000`)
            const wholeDayTimespan = [dateFrom, dateTo]

            return [
                wholeDayTimespan
            ]
        } else {
            return timeSpans.map(timeSpan => stubDatesFromTimespan(timeSpan, stubDay))
        }
    } else {
        return []
    }
}

export const mapToObject = (input, mapFunc, keyMapFunc = (i=>i)) => {
    return Object.fromEntries(input.map(i => ([keyMapFunc(i), mapFunc(i)])))
}

/**
 * Returns a map that contains a default mutation for each field in fieldNames, For example:
 * {
 *     updateName(state, value) {
 *         state['name'] = value
 *     },
 *     updateEmail(state, value) {
 *         state['email'] = value
 *     }
 * }
 *
 * @param fieldNames
 */
export const mapMutationsFromFieldNames = (fieldNames) => {
    return mapToObject(fieldNames, (fieldName) => (state, value) => {
        state[fieldName] = value
    }, getMutationName)
}

/**
 * Sorts two urlSuffixes by date (desc)
 *
 * @param a
 * @param b
 * @returns {number}
 */
export const sortUrlSuffixesByDate = (a, b) => {
    return new Date(b.createdTimestamp) - new Date(a.createdTimestamp)
}

/**
 * Gets the url for the platform avatar
 * Checks if the avatar exists, if not returns placeholder
 *
 * @param platformName
 * @param platformStatus
 * @returns {string}
 */

export const getListingPlatformAvatarUrl = (platformName, platformStatus) => {
    let status = platformStatus === "IN_SYNCHRONIZATION" ? "-lightgray" : ""
    let url
    try {
        url = require("@/assets/images/listing-medallions/medallion-" + platformName.toLowerCase().replace(/[. ,:-]+/g, "") + status + ".svg")
    }
    catch(e){
        url = require("@/assets/images/listing-medallions/medallion-placeholder.svg")
    }
    return url
}

export const orderByKey = (object) => {
    const entries = Object.keys(object)
      .sort((a,b) => a - b)
      .map(key => [key, object[key]])

    return Object.fromEntries(entries)
}
/**
 * Reads the uploaded image into base64
 * Returns the image in base64
 *
 * @param image {File}
 * @returns {string}
 */
export const readImageAsDataUrl = async (image) => {
    return await new Promise((resolve, reject) => {
        let fileReader = new FileReader();

        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = fileReader.onabort = (e) => reject(e);

        fileReader.readAsDataURL(image);
    })
}

// Initializes Userlane script
// See: https://docs.userlane.com/en/articles/3104211-install-the-userlane-snippet-into-your-code
export const initUserlane = (userId) => {
    if (!window.Userlane) {
        console.error('Userlane not found')
        return false
    }

    const property_ID = '8mkyx'

    window.Userlane('identify', userId)
    window.Userlane('init', property_ID)
}

// Hides Userlane
// See: https://docs.userlane.com/en/articles/2477204-hide-hide-userlane-on-specific-pages-of-your-application
export const hideUserlane = () => {
    if (!window.Userlane) {
        console.error('Userlane not found')
        return false
    }

    window.Userlane('hide')
}

/**
 * Returns a list of changed fields
 *
 * @param obj
 * @param origObj
 */

export const getChangedFields = (obj, origObj) => {
    let changed = []
    for(const key of Object.keys(obj)){
        if(typeof obj[key] === 'object' && obj[key] !== null && origObj !== null){
            changed = changed.concat(getChangedFields(obj[key], origObj[key]))
        }else if(obj[key] !== null && (!origObj || obj[key] !== origObj[key])){
            changed.push(key)
        }
    }
    return changed
}

/**
 * Returns a list of fields which have errors
 *
 * @param data
 */

export const getErrorFields = (data) => {
    let fields = []
    for(const error of data.errors){
        let splitted = error.name.split('.')
        fields.push(splitted[splitted.length-2])
    }
    return fields
}

/**
 * A debounce function
 * receives a callback function, a trigger delay
 * and immediate that triggers the function on the leading edge instead of the trailing
 *
 * @param func - function to trigger
 * @param wait - trigger delay
 * @param immediate - flag (leading edge, or trailing edge)
 */
export const debounce = (func, wait, immediate) => {
    let timeout;
	return function() {
        const context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * Scrolls to an element, needs to be called within this.$nextTick()
 * @param element DOMNode
 * @param offset Integer
 */
export const scrollToElement = (element, offset = 10) => {
    const header = document.querySelector('.header')
    const elPosition = element.getBoundingClientRect().top + window.scrollY
    const top = Math.floor(elPosition - header.offsetHeight)

    window.requestAnimationFrame(() => {
        window.scroll(0, 0);
        window.scroll({
            top: top - offset,
            behavior: 'smooth'
        });
    })
}

export const trimString = (str) => {
   return str.replace(/^\s+|\s+$/g, '') 
}