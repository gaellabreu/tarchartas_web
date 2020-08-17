import React, { useState } from 'react'
import { Modal, Button, Form, FormGroup, HelpBlock, ControlLabel, FormControl, DatePicker, InputNumber, SelectPicker, Uploader, Alert } from 'rsuite'
import Event from '../models/Event'
import API from '../API'
import { useEffect } from 'react'

export default (props) => {

    const [model, setModel] = useState(new Event())
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState({})

    var uploader;
    var form;

    useEffect(() => {
        if (props.show){
            fetchCategories()
            setFile({...{}})
        }
    }, [props.show])

    useEffect(() => {
        if (props.event?.id) {
            console.log(props.event)
            setModel({ ...model, ...props.event })

        }
        else{
            setModel({...model, ...new Event()})
        }
    }, [props.event])

    const fetchCategories = () => API.get('category')
        .then(response => setCategories([...response.data]))

    const handleFileChange = (e) => setFile(e[0].blobFile)

    const submit = () => {
        if (!canSave()) return

        const obj = {
            ...model,
            ...{
                date: model.date.toISOString(),
                start_time: parseInt(model.start_time),
                end_time: parseInt(model.end_time)
            }
        }

        if (!model.id) {
            API.post('event', obj)
                .then(response => uploadImage(response.data))
                .catch(() => Alert.error('Ocurrió un error al crear el evento.'))
        }
        else {
            API.put('event', obj)
                .then(() => {
                    Alert.success('Evento actualizado satisfactoriamente')
                    props.close()
                })
                .catch(() => Alert.error('Ocurrió un error al crear el evento.'))
        }
    }

    const uploadImage = (id) => {
        let formData = new FormData()
        formData.append('filename', file)

        API.put(`event/${id}/image`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(() => {
                if (!model.id)
                    Alert.success('Evento creado satisfactoriamente.')
                else
                    Alert.success('Imagen actualizada satisfactoriamente.')
                props.close()
            })
            .catch(() => console.log('An error ocurred'))
    }

    const canSave = () => {
        if (!model.name || !model.venue || !model.description || !model.start_time || !model.start_time || !model.category) {
            Alert.error('Todos los campos son requeridos.')
            return false
        }

        if (model.date < new Date()) {
            Alert.error('La fecha no puede ser menor al día actual.')
            return false
        }

        if (!model.id && !file?.name) {
            Alert.error('Debe cargar una imagen para guardar este evento.')
            return
        }
        return true
    }

    const readOnly = !!model.id

    return <Modal backdrop={true} show={props.show} onHide={props.close}>
        <Modal.Header>
            <Modal.Title>Nuevo Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form
                ref={ref => (form = ref)}
                fluid
                formValue={model}
                onChange={(e) => setModel({ ...model, ...e })}>
                <FormGroup>
                    <ControlLabel>Nombre del evento</ControlLabel>
                    <FormControl name="name" readOnly={readOnly} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Lugar</ControlLabel>
                    <FormControl name="venue" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Fecha</ControlLabel>
                    <FormControl accepter={DatePicker} name="date" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Hora de inicio</ControlLabel>
                    <FormControl accepter={InputNumber} max={24} min={1} name="start_time" />
                    <HelpBlock tooltip>Valores entre 1 y 24</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Hora de finalización</ControlLabel>
                    <FormControl accepter={InputNumber} max={24} min={1} name="end_time" />
                    <HelpBlock tooltip>Valores entre 1 y 24</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Descripción</ControlLabel>
                    <FormControl name="description" componentClass={'textarea'} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Categoría</ControlLabel>
                    <FormControl accepter={SelectPicker} data={categories || []} labelKey={'description'} valueKey={'id'} placement={'topStart'} name="category" readOnly={readOnly} />
                </FormGroup>
            </Form>
            <hr />
            Flyer del evento
            <Uploader
                autoUpload={false}
                onChange={handleFileChange}
                ref={ref => {
                    uploader = ref;
                }}
            />
            {model.id && file.name && <Button onClick={() => uploadImage(model.id)}>Subir flyer</Button>}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={submit} appearance="primary">{!model.id ? 'Crear' : 'Modificar'}</Button>
            <Button onClick={props.close} appearance="subtle">Cancelar</Button>
        </Modal.Footer>
    </Modal>
}