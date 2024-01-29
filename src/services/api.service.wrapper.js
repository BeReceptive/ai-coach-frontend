import {api} from './api.service'
import {BASE_URL} from "../utils/constants";

export const POST = async (url, data = null, config = null) => {
    var res = await api.post(BASE_URL + url, data, config)
    return res?.data
}

export const PUT = async (url, data = null, config = null) => {
    var res = await api.put(BASE_URL + url, data, config)
    return res?.data
}

export const GET = async (url, params, config = null) => {
    var res = await api.get(BASE_URL + url, {params}, config)
    return res?.data
}