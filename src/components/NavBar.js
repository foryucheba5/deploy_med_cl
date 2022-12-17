import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CREATE_PATIENT_ROUTE,
  CREATE_PROTOCOL_ROUTE,
  LOGIN_ROUTE,
  PATIENTS_ROUTE,
  VIEW_PATIENT_ROUTE, VIEW_PROTOCOL_ROUTE
} from "../utils/consts";

const NavBar = observer(() => {
  const location = useLocation()
  const navigate = useNavigate()
  const clickToCreate = async () =>{
    navigate(CREATE_PATIENT_ROUTE)
  }
  const clickToList= async () =>{
    navigate(PATIENTS_ROUTE)
  }
  if(location.pathname === PATIENTS_ROUTE || location.pathname.slice(0,16) === CREATE_PROTOCOL_ROUTE
    || location.pathname.slice(0,12) === VIEW_PATIENT_ROUTE || location.pathname.slice(0,13) === VIEW_PROTOCOL_ROUTE
    || location.pathname === CREATE_PATIENT_ROUTE){
    return (
      <Navbar bg="primary" variant="light">
        <Container style={{width: 1350}}>
          { location.pathname === PATIENTS_ROUTE ?
            <Button onClick={clickToCreate} variant="outline-light">Создать пациента</Button>:
            <Button onClick={clickToList} variant="outline-light">К списку пациентов</Button>
          }
        </Container>
      </Navbar>
    );
  }
  else {
    return (
      <div></div>
    );
  }

});

export default NavBar;