import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CREATE_PATIENT_ROUTE,
  CREATE_PROTOCOL_ROUTE,
  PATIENTS_ROUTE,
  VIEW_PATIENT_ROUTE,
  VIEW_PROTOCOL_ROUTE
} from "../utils/consts";
import { createPatient, deletePatient, fetchOnePatient, updatePatient } from "../http/patientAPI";
import { createProtocol, deleteProtocol, fetchOneProtocol, updateProtocol } from "../http/protocolAPI";

const Protocol = observer(() => {
  let pId = -1;
  let idProt = -1;
  const [protocol, setProtocol] = useState("");
  const [patientId, setPatientId] = useState(-1);
  const [result, setResult] = useState(["", "", "", "", "", "", "", "", "", "", ""]);
  const [date, setDate] = useState('')
  const [anamnes, setAnamnes] = useState("");
  const [pravBez, setPravBez] = useState("");
  const [prav, setPrav] = useState("");
  const [levBez, setLevBez] = useState("");
  const [lev, setLev] = useState("");
  const [rc, setRc] = useState("");
  const [kv, setKv] = useState("");
  const [ot, setOt] = useState("");
  const [prox, setProx] = useState("");
  const [sc, setSc] = useState("");
  const [rog, setRog] = useState("");
  const [cam, setCam] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname.slice(0, 16) === CREATE_PROTOCOL_ROUTE;
  if (isNew) {
    const { id } = useParams();
    pId = Number(id);
  } else {
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
      fetchOneProtocol(id).then(data => {
        setProtocol(data);
        setResult(data.result);
        setPatientId(data.patientId);
        setDate(data.date)
      });
    }, [id]);
    idProt = id;
    console.log(protocol);
    console.log(result);
    let mass = document.getElementsByName("rc");
    if (mass[0]) {
      if (result[4] === "норма") mass[0].setAttribute("checked", "true");
      if (result[4] === "утолщён") mass[1].setAttribute("checked", "true");
      if (result[4] === "чешуйки") mass[2].setAttribute("checked", "true");
    }
    let mass1 = document.getElementsByName("kv");
    if (mass1[0]) {
      if (result[5] === "норма") mass1[0].setAttribute("checked", "true");
      if (result[5] === "гиперемирована") mass1[1].setAttribute("checked", "true");
    }
    let mass2 = document.getElementsByName("ot");
    if (mass2[0]) {
      if (result[6] === "нет") mass2[0].setAttribute("checked", "true");
      if (result[6] === "немного") mass2[1].setAttribute("checked", "true");
      if (result[6] === "слизистое") mass2[2].setAttribute("checked", "true");
    }
    let mass3 = document.getElementsByName("prox");
    if (mass3[0]) {
      if (result[7] === "активная") mass3[0].setAttribute("checked", "true");
      if (result[7] === "Пассивная") mass3[1].setAttribute("checked", "true");
    }
    let mass4 = document.getElementsByName("sclera");
    if (mass4[0]) {
      if (result[8] === "норма") mass4[0].setAttribute("checked", "true");
      if (result[8] === "конъюктивальная") mass4[1].setAttribute("checked", "true");
      if (result[8] === "смешанная") mass4[2].setAttribute("checked", "true");
    }
    let mass5 = document.getElementsByName("rog");
    if (mass5[0]) {
      if (result[9] === "прозрачная") mass5[0].setAttribute("checked", "true");
      if (result[9] === "помутнение") mass5[1].setAttribute("checked", "true");
    }
    let mass6 = document.getElementsByName("cam");
    if (mass6[0]) {
      if (result[10] === "мелкая") mass6[0].setAttribute("checked", "true");
      if (result[10] === "глубокая") mass6[1].setAttribute("checked", "true");
      if (result[10] === "неравномерная") mass6[2].setAttribute("checked", "true");
    }
  }
  const clickToCreate = async () => {
    let data = [pravBez, prav, levBez, lev, rc, kv, ot, prox, sc, rog, cam];
    let id = -1;
    await createProtocol(pId, 1, anamnes, data).then((res) => {
      console.log(res.request.status);
      let otv = document.getElementById("otv");
      if (res.request.status === 201) {
        id = res.data.id;
        console.log(id);
      }
      if (res.request.status === 400) {
        otv.innerText = "Неверный формат данных";
      }
      if (res.request.status === 500) {
        otv.innerText = "Ошибка на сервере. Повторите позже";
      }
    });
    if (id !== -1) {
      navigate(VIEW_PROTOCOL_ROUTE + "/" + id);
      window.location.reload();
    }
  };
  const clickToUpdate = async () => {
    let prB=""
    let pr=""
    let lvB=""
    let lv=""
    let r=""
    let k=""
    let ott=""
    let prx=""
    let scc=""
    let rg=""
    let cm=""
    if(!pravBez) prB=result[0]
    else prB=pravBez
    if(!prav) pr=result[1]
    else pr=prav
    if(!levBez) lvB=result[2]
    else lvB=levBez
    if(!lev) lv=result[3]
    else lv=lev
    if(!rc) r=result[4]
    else r=rc
    if(!kv) k=result[5]
    else k=kv
    if(!ot) ott=result[6]
    else ott=ot
    if(!prox) prx=result[7]
    else prx=prox
    if(!sc) scc=result[8]
    else scc=sc
    if(!rog) rg=result[9]
    else rg=rog
    if(!cam) cm=result[10]
    else cm=cam
    let data = [prB, pr, lvB, lv, r, k, ott, prx, scc, rg, cm];
    await updateProtocol(patientId,1, anamnes, data).then((res)=>{
      let otv = document.getElementById('otv');
      if (res.request.status === 200){
        otv.classList.replace("text-danger","text-success")
        otv.innerText="Изменения сохранены"
      }
      if (res.request.status === 400){
        otv.innerText="Неверный формат данных"
      }
      if (res.request.status === 500){
        otv.innerText="Ошибка на сервере. Повторите позже"
      }
    })

  };
  const clickToDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    let ok = confirm('Удалить протокол?');
    if (ok){
      await deleteProtocol(idProt)
      navigate(VIEW_PATIENT_ROUTE + "/" + patientId);
    }

  };
  const clickToPatient = async () => {
    navigate(VIEW_PATIENT_ROUTE + "/" + patientId);
  };
  return (
    <Container
      style={{ height: window.innerHeight - 100 }}
      className="d-flex justify-content-center align-items-center">
      <Card style={{ width: 1350 }}>
        <Card.Header>
          <Row>
            <Col>
              <h4 className="my-1 mx-3">
                {isNew ? "Новый протокол " : " Протокол пациента "}
                <span class="small" id="otv" className="text-danger"></span>
              </h4>
            </Col>
            <Col>
            </Col>
            {isNew ? "" :
              <Col className="d-flex justify-content-start align-items-center">
                <Button variant={"primary"} onClick={clickToPatient}>
                  Вернуться к пациенту
                </Button>
              </Col>
            }
            <Col className="d-flex justify-content-end align-items-center">
              {isNew ? "" :
                <Button variant={"danger"} onClick={clickToDelete}>
                  Удалить протокол
                </Button>
              }
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form className="mx-3">
            {isNew ? "" :
              <Row>
                <Col><h5>Дата приема { date.slice(0,10)}</h5></Col>
              </Row>
            }
            <Row>
              <Col><h5>Шаблон </h5></Col>
              <Col>
                {isNew ? <Form.Check value="1"
                                     type="radio" defaultChecked={true} name="pattern" label="Осмотр офтальмолога" /> :
                  <h6>Осмотр офтольмолога</h6>}
              </Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <h5>Анамнез <span id="d" className="text-danger"></span></h5>
                {
                  isNew ? <Form.Control onChange={e => setAnamnes(e.target.value)} placeholder="Введите анамнез..."
                                        as="textarea" rows={3} /> :
                    <Form.Control defaultValue={protocol.anamnes} onChange={e => setAnamnes(e.target.value)}
                                  placeholder="Введите анамнез..." as="textarea" rows={3} />
                }
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Острота зрения</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Form.Label>Правый глаз</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>без коррекции</Form.Label>
                    {
                      isNew ? <Form.Control onChange={e => setPravBez(e.target.value)} type="number"></Form.Control> :
                        <Form.Control defaultValue={result[0]} onChange={e => setPravBez(e.target.value)}
                                      type="number"></Form.Control>
                    }
                  </Col>
                  <Col>
                    <Form.Label>с коррекцией</Form.Label>
                    {
                      isNew ? <Form.Control onChange={e => setPrav(e.target.value)} type="number"></Form.Control> :
                        <Form.Control defaultValue={result[1]} onChange={e => setPrav(e.target.value)}
                                      type="number"></Form.Control>
                    }
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Label>Левый глаз</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>без коррекции</Form.Label>
                    {
                      isNew ? <Form.Control onChange={e => setLevBez(e.target.value)} type="number"></Form.Control> :
                        <Form.Control defaultValue={result[2]} onChange={e => setLevBez(e.target.value)}
                                      type="number"></Form.Control>
                    }
                  </Col>
                  <Col>
                    <Form.Label>с коррекцией</Form.Label>
                    {
                      isNew ? <Form.Control onChange={e => setLev(e.target.value)} type="number"></Form.Control> :
                        <Form.Control defaultValue={result[3]} onChange={e => setLev(e.target.value)}
                                      type="number"></Form.Control>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Row> <Col><h5>Веки</h5></Col></Row>
              <Row>
                <Col>
                  <Form.Label>Ресничный край</Form.Label>
                  <Form.Group>
                    <Form.Check value="норма"
                                onChange={e => setRc(e.target.value)}
                                type="radio" name="rc" label="Норма" />
                    <Form.Check value="утолщён"
                                onChange={e => setRc(e.target.value)}
                                type="radio" name="rc" label="Утолщен" />
                    <Form.Check value="чешуйки"
                                onChange={e => setRc(e.target.value)}
                                type="radio" name="rc" label="Чешуйки" />

                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Конъюктива век</Form.Label>
                  <Form.Group>
                    <Form.Check value="норма"
                                onChange={e => setKv(e.target.value)}
                                type="radio" name="kv" label="Норма" />
                    <Form.Check value="гиперемирована"
                                onChange={e => setKv(e.target.value)}
                                type="radio" name="kv" label="Гиперемирована" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Отделяемое</Form.Label>
                  <Form.Group>
                    <Form.Check value="нет"
                                onChange={e => setOt(e.target.value)}
                                type="radio" name="ot" label="Нет" />
                    <Form.Check value="немного"
                                onChange={e => setOt(e.target.value)}
                                type="radio" name="ot" label="Немного" />
                    <Form.Check value="слизистое"
                                onChange={e => setOt(e.target.value)}
                                type="radio" name="ot" label="Слизистое" />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Row>
              <Row>
                <Col><h5>Слезные органы</h5></Col>
                <Col><h5>Склера</h5></Col>
                <Col><h5>Роговица</h5></Col>
                <Col><h5>Передняя камера</h5></Col>
              </Row>
              <Row>
                <Col><Form.Label>Проходимость</Form.Label>
                  <Form.Group>
                    <Form.Check value="активная"
                                onChange={e => setProx(e.target.value)}
                                type="radio" name="prox" label="Активная" />
                    <Form.Check value="Пассивная"
                                onChange={e => setProx(e.target.value)}
                                type="radio" name="prox" label="Пассивная" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Check value="норма"
                                onChange={e => setSc(e.target.value)}
                                type="radio" name="sclera" label="Норма" />
                    <Form.Check value="конъюктивальная"
                                onChange={e => setSc(e.target.value)}
                                type="radio" name="sclera" label="Конъюктивальная" />
                    <Form.Check value="смешанная"
                                onChange={e => setSc(e.target.value)}
                                type="radio" name="sclera" label="Смешанная" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Check value="прозрачная"
                                onChange={e => setRog(e.target.value)}
                                type="radio" name="rog" label="Прозрачная" />
                    <Form.Check value="помутнение"
                                onChange={e => setRog(e.target.value)}
                                type="radio" name="rog" label="Помутнение" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Check value="мелкая"
                                onChange={e => setCam(e.target.value)}
                                type="radio" name="cam" label="Мелкая" />
                    <Form.Check value="глубокая"
                                onChange={e => setCam(e.target.value)}
                                type="radio" name="cam" label="Глубокая" />
                    <Form.Check value="неравномерная"
                                onChange={e => setCam(e.target.value)}
                                type="radio" name="cam" label="Неравномерная" />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <div className="d-grid gap-2">
              {
                isNew ? <Button variant="outline-primary" size="lg"
                                onClick={clickToCreate}>
                    Добавить протокол
                  </Button> :
                  <Button variant="outline-primary" size="lg"
                          onClick={clickToUpdate}>
                    Сохранить изменения
                  </Button>
              }
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default Protocol;