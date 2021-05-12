import axios from 'axios';

export const postApiCall = (value, url, header) => {

    const obj = {
        requestData: value
    }
    return axios.post(url, obj, header)

}

export const getApiCall = (url, header) => {

    return axios.get(url, header)

}
