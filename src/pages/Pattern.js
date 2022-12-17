import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { $host } from "../http";

const Pattern = () => {
  const [name, setName] = useState('')
  const [content, setContent]  = useState('')
  const clickToCreate = async () => {
    let valid = true;
    if(!name) {
      valid=false;
      let div = document.getElementById('name');
      div.innerText="заполните поле"
    }
    else {
      let div = document.getElementById('name');
      div.innerText=""
    }
    if(!content){
      valid=false;
      let div = document.getElementById('content');
      div.innerText="заполните поле"
    }
    else {
      let div = document.getElementById('content');
      div.innerText=""
    }
    if (valid){
      let mass = content.split(";")
      let res = await $host.post('patterns/create',{"name":name, "content": mass})
    }
  }
  return (
    <Container
      style={{height: window.innerHeight - 300}}
      className="d-flex justify-content-center align-items-center">
      <Card style={{width: 1350}}>
        <Card.Header>
          <h5>
            Создание шаблона протокола
          </h5>
        </Card.Header>
        <Card.Body>
          <Form className="mx-3">
            <Form.Label>Название шаблона <span id="name" className="text-danger"></span></Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              type="text" placeholder="Название"/>
            <Form.Label>Содержание шаблона <span id="content" className="text-danger"></span></Form.Label>
            <Form.Control
              value={content}
              onChange={e => setContent(e.target.value)}
              type="text" placeholder="Название"/>
            <Button variant="outline-primary" size="lg"
                    onClick={clickToCreate}>
              Создать шаблон
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Pattern;