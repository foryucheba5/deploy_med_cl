import {
    CREATE_PATIENT_ROUTE, CREATE_PATTERN_ROUTE, CREATE_PROTOCOL_ROUTE,
    LOGIN_ROUTE,
    PATIENTS_ROUTE,
    VIEW_PATIENT_ROUTE, VIEW_PROTOCOL_ROUTE
} from "./utils/consts";
import Patients from "./pages/Patients";
import Patient from "./pages/Patient";
import Check from "./pages/Check";
import Pattern from "./pages/Pattern";
import Protocol from "./pages/Protocol";

export const authRoutes = []

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Check
    },
    {
        path: PATIENTS_ROUTE,
        Component: Patients
    },
    {
        path: CREATE_PATIENT_ROUTE,
        Component: Patient
    },
    {
        path: VIEW_PATIENT_ROUTE + '/:id',
        Component: Patient
    },
    {
        path: CREATE_PATTERN_ROUTE,
        Component: Pattern
    },
    {
        path: CREATE_PROTOCOL_ROUTE + '/:id',
        Component: Protocol
    },
    {
        path: VIEW_PROTOCOL_ROUTE + '/:id',
        Component: Protocol
    }

]