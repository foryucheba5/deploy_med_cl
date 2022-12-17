import {makeAutoObservable} from "mobx";

export default class PatientStore {
    constructor() {
        this._patients = []
        makeAutoObservable(this)
    }

    setPatients(patients) {
        this._patients = patients
    }

    get patients() {
        return this._patients
    }
}