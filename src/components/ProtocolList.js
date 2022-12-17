import { VIEW_PATIENT_ROUTE, VIEW_PROTOCOL_ROUTE } from "../utils/consts";
import { NavLink } from "react-bootstrap";
import React from "react";


export default props => (
   props.data.map(item =>(
      <NavLink style={{color:'black'}} href={VIEW_PROTOCOL_ROUTE + '/' + item.id}> Протокол от {item.date.slice(0,10)}</NavLink>
  ))
)