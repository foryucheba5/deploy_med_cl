import { $authHost } from "./index";


export const createPatient = async (sn, fn, mn, pass, date, g, p) => {
  return await $authHost.post('patients/create', {
    "secondName": sn,
    "firstName": fn,
    "middleName": mn,
    "passport": pass,
    "dateOfBirth": date,
    "gender": g,
    "phone": p
  })
}

export const updatePatient = async (id, sn, fn, mn, pass, date, g, p) =>{
  return await $authHost.put('patients/update', {"secondName": sn,
    "firstName": fn,
    "middleName": mn,
    "passport": pass,
    "dateOfBirth": date,
    "gender": g,
    "phone": p
  },{params : {id}})
}

export const deletePatient = async (id, patient) => {
  await $authHost.put('patients/delete', {patient},{params: {
      id
    }})
}

export const fetchOnePatient = async (id) => {
  const {data} = await $authHost.get('patients/get', {params: {
      id
    }})
  const d = data[0]
  let pass = d.passport.split(" ")
  d.seria = pass[0]
  d.nomer = pass[1]
  d.dateOfBirth = d.dateOfBirth.slice(0,10)
  return d
}