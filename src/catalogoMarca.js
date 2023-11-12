import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import './style.css'
import { FormFeedback, FormGroup, Form, Button, Input } from 'reactstrap'

export default class catalogoMarca extends Component {
    constructor(props) {
        super(props)
        this.state = {
            marcas: [],
            idMarca: "0",
            nombreMarca: "",
            formularioMarca: false,
            nombreMarcaInvalid: false
        }
    }
    componentDidMount() {
        this.listaMarcas()
    }

    mostrarFormularioMarca = () => {
        this.setState({
            formularioMarca: !this.state.formularioMarca,
            nombreMarca: "",
            nombreMarcaInvalid: false
        })
    }

    listaMarcas = async () => {
        try {
            await axios.get(`${g.url_api}/Marca`)
                .then(res => {
                    this.setState({ marcas: res.data })
                })
        }
        catch (err) {
            alert(err)
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    guardarInfo = async (e) => {
        e.preventDefault()

        this.setState({
            nombreMarcaInvalid: this.state.nombreMarca === "" ? true : false
        })

        if (this.state.nombreMarca === "") {
            alert("Error:\nLos campos marcados con * son requeridos.")
            return false
        }
        try {
            await axios.post(`${g.url_api}/Marca/${this.state.nombreMarca}`)
                .then(res => {
                    alert("Ok!\nEl alta fue satisfactoria.")
                })
            this.mostrarFormularioMarca()
            this.listaMarcas()
        }
        catch (e) {
            alert(e)
        }
    }

    render() {
        return (
            <>
                CATALOGO DE MARCAS <br />

                {this.state.formularioMarca === false &&
                    <button
                        type="buton"
                        onClick={this.mostrarFormularioMarca}
                    >
                        Formulario Marca
                    </button>
                }

                {this.state.formularioMarca &&
                    <fieldset>
                        <legend>Formulario de alta de marca</legend>
                        <Form onSubmit={this.guardarInfo}>
                            <FormGroup>
                                * nombreMarca:
                                <Input
                                    type="text"
                                    name="nombreMarca"
                                    value={this.state.nombreMarca}
                                    onChange={this.onChange}
                                    invalid={this.state.nombreMarcaInvalid}
                                    className='inputBGC'
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit">
                                    Guardar
                                </Button>
                                <Button onClick={this.mostrarFormularioMarca}>
                                    Cancelar
                                </Button>
                            </FormGroup>
                        </Form>
                    </fieldset>
                }
                <fieldset>
                    <legend>Marcas</legend>
                    {this.state.marcas.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre de la marca</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.marcas.map((marca) => {
                                    return (
                                        <tr key={marca.idMarca}>
                                            <td>{marca.nombreMarca}</td>
                                            <td>
                                                <Button>
                                                    Editar
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }

                    {this.state.marcas.length < 1 &&
                        <h4>
                            No se encontraron registros
                        </h4>
                    }
                </fieldset>
            </>
        )
    }
}