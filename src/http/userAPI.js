import {$authHost, $host} from "./index";


export const check = async (password) => {  
    const {data} = await $host.post(`auth/check?pass=${password}`)
    localStorage.setItem('data', data)
    return data
}