import { $authHost, $host } from "./index";


export const createProtocol = async (idP, id, anam, data) => {
  return await $authHost.post('protocol/create', {
    "patientId": idP,
    "patternId": id,
    "anamnes": anam,
    "result": data
  })
}

export const updateProtocol = async (idP, id, anam, data) =>{
  return await $authHost.put('protocol/update', {
    "patientId": idP,
    "patternId": id,
    "anamnes": anam,
    "result": data
  },{params : {id}})
}

export const deleteProtocol = async (id) => {
  await $authHost.put('protocol/delete', {},{params: {
      id
    }})
}

export const fetchOneProtocol = async (id) => {
  const {data} = await $authHost.get('protocol/get', {params: {
      id
    }})
  return data[0]
}
export const fetchAllProtocol = async (id) => {
  const {data} = await $authHost.get('protocol/getAll', {params: {
      id
    }})
  return data
}
export const fetchAllPattern = async () => {
  const {data} = await $host.get('patterns/getAll')
  return data
}