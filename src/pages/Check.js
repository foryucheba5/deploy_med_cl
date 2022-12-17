import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {PATIENTS_ROUTE} from "../utils/consts";      //Сюда маршрут куда будет переходить 
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {check } from '../http/userAPI';



const Check = observer(() => {
    const navigate = useNavigate() 
    const [password, setPassword] = useState('')
    const [validError, setValidError] = useState('')
    const [user, setUser] = useContext(Context); 
    
    

    const click = async () => {
        try {
            let data;            
            data = await check(password);
            setUser(data)
            setValidError('')
            
            navigate(PATIENTS_ROUTE)                     //Сюда внутрь скобок маршрут по которому будет переходить
        } catch (e) {
            setValidError('Неверный код доступа')
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Вход</h2>
                <Form className="d-flex flex-column">
                    <label>Код доступа</label>
                    
                    <Form.Control
                        name = 'password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {<div style={{color:"red"}}>{validError}</div>}
                        <Button               
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {'Войти'}
                            
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Check;