import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Context } from "../index";
import { createPatient, deletePatient, fetchOnePatient, updatePatient } from "../http/patientAPI";
//import IMask from 'imask';
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CREATE_PATIENT_ROUTE, CREATE_PROTOCOL_ROUTE, PATIENTS_ROUTE, VIEW_PATIENT_ROUTE } from "../utils/consts";
import { fetchAllProtocol } from "../http/protocolAPI";
import Protocol from "./Protocol";
import ProtocolList from "../components/ProtocolList";



const Patient = observer(() => {
  let idPatient = -1;
  const location = useLocation()
  const navigate = useNavigate()
  const isNew= location.pathname === CREATE_PATIENT_ROUTE
  const [patient, setPatient] = useState('')
  const [protocols, setProtocols] = useState('')
  const [secondName, setSecondName]  = useState('')
  const [firstName, setFirstName]  = useState('')
  const [middleName, setMiddleName]  = useState('')
  const [seria, setSeria] = useState('')
  const [nomer, setNomer] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState(-1)
  const [phone, setPhone] = useState('')
  if(!isNew){
    const {id} = useParams()
    useEffect(() => {
      fetchOnePatient(id).then(data => setPatient(data))
    },[id])
    idPatient = Number(id)
    if(idPatient!== -1){
      useEffect(() => {
        fetchAllProtocol(idPatient).then(data => setProtocols(data))
      },[idPatient])
      console.log(protocols)
    }
    let mass = document.getElementsByName("gender");
    if (mass[0]) {
      if (patient.gender === 1) mass[0].setAttribute("checked", "true");
      if (patient.gender === 0) mass[1].setAttribute("checked", "true");
    }
  }

  const clickToCreate = async () => {
    let valid = true;
    if(!secondName) {
      valid=false;
      let div = document.getElementById('sn');
      div.innerText="?????????????????? ????????"
    }
    else {
      let div = document.getElementById('sn');
      div.innerText=""
    }
    if(!firstName){
      valid=false;
      let div = document.getElementById('fn');
      div.innerText="?????????????????? ????????"
    }
    else {
      let div = document.getElementById('fn');
      div.innerText=""
    }
    if(!middleName){
      valid=false;
      let div = document.getElementById('mn');
      div.innerText="?????????????????? ????????"
    }
    else {
      let div = document.getElementById('mn');
      div.innerText=""
    }
    if(!dateOfBirth){
      valid=false;
      let div = document.getElementById('d');
      div.innerText="?????????????????? ????????"
    }
    else {
      let div = document.getElementById('d');
      div.innerText=""
    }
    if(gender === -1){
      valid=false;
      let div = document.getElementById('g');
      div.innerText="?????????????????? ????????"
    }
    else {
      let div = document.getElementById('g');
      div.innerText=""
    }
    let divP = document.getElementById('p');
    if(seria && nomer){
      if(seria.length !== 4 || nomer.length !== 6){
        valid=false;
        divP.innerText="";
        if(seria.length !== 4) divP.innerText+="?????????? ?????????? - 4"
        if(nomer.length !== 6) divP.innerText+=" ?????????? ???????????? - 6"
      }
      else {
        divP.innerText=""
      }
    }
    if (valid){
      let passport = seria+" "+nomer
      let id=-1;
      await createPatient(secondName,firstName,middleName,passport,dateOfBirth,Number(gender),phone).then((res)=>{
        console.log(res.request.status)
        let otv = document.getElementById('otv');
        if (res.request.status === 201){
          id = res.data.id
        }
        if (res.request.status === 400){
          otv.innerText="???????????????? ???????????? ????????????"
        }
        if (res.request.status === 500){
          otv.innerText="???????????? ???? ??????????????. ?????????????????? ??????????"
        }
      })
      if(id !== -1){
        navigate(VIEW_PATIENT_ROUTE+"/"+id)
        window.location.reload()
      }
    }
  }
  const clickToUpdate = async () => {
    let sn=""
    let fn=""
    let mn=""
    let db=""
    let g=-1
    let s=""
    let n=""
    let p=""
    if(!secondName || 0 === secondName.length) sn=patient.secondName
    else sn=secondName
    if(!firstName) fn=patient.firstName
    else fn=firstName
    if(!middleName) mn=patient.middleName
    else mn=middleName
    if(!dateOfBirth) db=patient.dateOfBirth
    else db=dateOfBirth
    if(gender === -1) g=patient.gender
    else g=gender
    if(!seria) s=patient.seria
    else s=seria
    if(!nomer) n=patient.nomer
    else n=nomer
    if(!phone) p=patient.phone
    else p=phone
    let passport = s+" "+n
    await updatePatient(patient.id,sn,fn,mn,passport,db,g,p).then((res)=>{
      let otv = document.getElementById('otv');
      if (res.request.status === 200){
        otv.classList.replace("text-danger","text-success")
        otv.innerText="?????????????????? ??????????????????"
      }
      if (res.request.status === 400){
        otv.innerText="???????????????? ???????????? ????????????"
      }
      if (res.request.status === 500){
        otv.innerText="???????????? ???? ??????????????. ?????????????????? ??????????"
      }
    })
  }
  const clickToDelete = async () =>{
    // eslint-disable-next-line no-restricted-globals
    let ok = confirm('?????????????? ?????????????????');
    if (ok){
      await deletePatient(patient.id, patient)
      navigate(PATIENTS_ROUTE)
    }
  }
  const clickToProtocol = async () => {
    navigate(CREATE_PROTOCOL_ROUTE + "/" + idPatient)
  }
  return (
    <Container
      style={{height: window.innerHeight - 300}}
      className="d-flex justify-content-center align-items-center">
      <Card style={{width: 1350}}>
        <Card.Header>
          <Row>
            <Col>
          <h5 className="my-1 mx-3">
            {isNew ? "?????????? ?????????????? " : " ???????????????? ???????????????? "}
            <span id="otv" className="text-danger"></span>
          </h5>
            </Col>
            <Col className="d-flex justify-content-end align-items-end">
              {isNew ? "":
                <Button variant={"danger"}
                        onClick={clickToDelete}>
                  ?????????????? ????????????????
                </Button>
              }
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form className="mx-3">
            <Row className="mb-3">
              <Col>
                <Form.Label>?????????????? <span id="sn" className="text-danger"></span></Form.Label>
                { isNew ? <Form.Control
                    value={secondName}
                    onChange={e => setSecondName(e.target.value)}
                    type="text" placeholder="??????????????"/> :
                  <Form.Control
                    defaultValue={patient.secondName}
                    onChange={e => setSecondName(e.target.value)}
                    type="text" placeholder="??????????????"/>
                }
              </Col>
              <Col>
                <Form.Label>???????? ???????????????? <span id="d" className="text-danger"></span></Form.Label>
                {
                  isNew ? <Form.Control value={dateOfBirth}
                                        onChange={e => setDateOfBirth(e.target.value)}
                                        type="date"/> :
                    <Form.Control defaultValue={patient.dateOfBirth}
                                  onChange={e => setDateOfBirth(e.target.value)}
                                  type="date"/>
                }
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>?????? <span id="fn" className="text-danger"></span></Form.Label>
                {
                  isNew ? <Form.Control value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        type="text" placeholder="??????"/> :
                    <Form.Control defaultValue={patient.firstName}
                                  onChange={e => setFirstName(e.target.value)}
                                  type="text" placeholder="??????"/>
                }
              </Col>
              <Col>
                <Form.Label>?????? <span id="g" className="text-danger"></span></Form.Label>
                <Form.Check value="1" onChange={e => setGender(Number(e.target.value))} type="radio"  name="gender" label="??????????????"/>
                <Form.Check value="0" onChange={e => setGender(Number(e.target.value))} type="radio" name="gender" label="??????????????"/>

              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>???????????????? <span id="mn" className="text-danger"></span></Form.Label>
                {
                  isNew ? <Form.Control value={middleName}
                                        onChange={e => setMiddleName(e.target.value)} type="text" placeholder="????????????????"/> :
                    <Form.Control defaultValue={patient.middleName}
                                  onChange={e => setMiddleName(e.target.value)} type="text" placeholder="????????????????"/>
                }

              </Col>
              <Col>
                <Form.Label>?????????? ????????????????</Form.Label>
                {
                  isNew ? <Form.Control value={phone}
                                        onChange={e => setPhone(e.target.value)} type="text" id="phone"/> :
                    <Form.Control defaultValue={patient.phone}
                                  onChange={e => setPhone(e.target.value)} type="text" id="phone"/>
                }
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>?????????????? <span id="p" className="text-danger"></span></Form.Label>
                <InputGroup>
                  {
                    isNew ?  <Form.Control value={seria}
                                           onChange={e => setSeria(e.target.value)} id="seria" type="text" placeholder="??????????"/> :
                      <Form.Control defaultValue={patient.seria}
                                    onChange={e => setSeria(e.target.value)} id="seria" type="text" placeholder="??????????"/>
                  }
                  {
                    isNew ? <Form.Control value={nomer}
                                          onChange={e => setNomer(e.target.value)} id="nomer" type="text" placeholder="??????????"/> :
                      <Form.Control defaultValue={patient.nomer}
                                    onChange={e => setNomer(e.target.value)} id="nomer" type="text" placeholder="??????????"/>
                  }
                </InputGroup>
              </Col>
              <Col>
              </Col>
              <Col>
              </Col>
            </Row>
            {isNew ? "":
            <Row>
              <Row>
                <Col className="d-flex justify-content-start align-items-center">
                  <h5>??????????????????</h5>
                </Col>
                <Col className="d-flex justify-content-start align-items-center">
                  <Button variant="outline-primary" onClick={clickToProtocol}>?????????????? ????????????????</Button>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                {protocols!=='' ? <ProtocolList data={protocols} /> : ""}
                </Col>
                <Col>

                </Col>
              </Row>
            </Row>}
            <div className="d-grid gap-2">
              {
                isNew ? <Button variant="outline-primary" size="lg"
                                onClick={clickToCreate}>
                    ???????????????? ????????????????
                  </Button> :
                  <Button variant="outline-primary" size="lg"
                          onClick={clickToUpdate}>
                    ?????????????????? ??????????????????
                  </Button>
              }
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default Patient;