import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Panel, Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'rsuite'
import LoginModel from '../models/Login'
import API from '../API'

const centerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '30%',
    marginLeft: '-200px',
    marginTop: '-150px'
}
export default () => {

    const [model, setModel] = useState(new LoginModel())
    const history = useHistory()

    const submit = () => API.post('signin', model)
        .then(response => {
            window.sessionStorage.setItem('token', response.headers.authorization)

            while(window.sessionStorage.getItem('token') == null){}

            history.push('/home')
        })

    return <Panel style={centerStyle} header="Iniciar sesión" shaded>
        <Form fluid formValue={model} onChange={(e) => setModel({ ...model, ...e })}>
            <FormGroup>
                <ControlLabel>Correo electrónico</ControlLabel>
                <FormControl
                    name="email" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Contraseña</ControlLabel>
                <FormControl
                    name="password"
                    type="password" />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar fluid>
                    <Button type={'submit'} onClick={submit} fluid appearance="primary">Entrar</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form>
    </Panel>
}