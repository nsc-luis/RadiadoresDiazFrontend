import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import './style.css'
import { FormFeedback, Input, FormGroup, Form, Button } from 'reactstrap'

export default class catalogoProveedor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proveedores: [],
            idProveedor: "0",
            nombreProveedor: "",
            formularioProveedor: false,
            nombreProveedorInvalid: false
        }
    }
    componentDidMount() {
        this.listaProveedores()
    }

    mostrarFormularioProveedor = () => {
        this.setState({
            formularioProveedor: !this.state.formularioProveedor,
            nombreProveedor: "",
            nombreProveedorInvalid: false
        })
    }

    listaProveedores = async () => {
        try {
            await axios.get(`${g.url_api}/Proveedor`)
                .then(res => {
                    this.setState({ proveedores: res.data })
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
            nombreProveedorInvalid: this.state.nombreProveedor === "" ? true : false
        })

        if (this.state.nombreProveedor === "") {
            alert("Error:\nLos campos marcados con * son requeridos.")
            return false
        }
        try {
            await axios.post(`${g.url_api}/Proveedor/${this.state.nombreProveedor}`)
                .then(res => {
                    alert("Ok!\nEl alta fue satisfactoria.")
                })
            this.mostrarFormularioProveedor()
            this.listaProveedores()
        }
        catch (e) {
            alert(e)
        }
    }
    render() {

        return (
            <>
                CATALOGO DE PROVEEDORES <br />

                {this.state.formularioProveedor === false &&
                    <button
                        type="buton"
                        onClick={this.mostrarFormularioProveedor}
                    >
                        Formulario Proveedor
                    </button>
                }

                {this.state.formularioProveedor &&
                    <fieldset>
                        <legend>Formulario de alta de proveedor</legend>
                        <Form onSubmit={this.guardarInfo}>
                            <FormGroup>
                                * nombreProveedor:
                                <Input
                                    type="text"
                                    name="nombreProveedor"
                                    value={this.state.nombreProveedor}
                                    onChange={this.onChange}
                                    invalid={this.state.nombreProveedorInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit">
                                    Guardar
                                </Button>
                                <Button onClick={this.mostrarFormularioProveedor}>
                                    Cancelar
                                </Button>
                            </FormGroup>
                        </Form>
                    </fieldset>
                }
                <fieldset>
                    <legend>Proveedores</legend>
                    {this.state.proveedores.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre del proveedor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.proveedores.map((proveedor) => {
                                    return (
                                        <tr key={proveedor.idProveedor}>
                                            <td>{proveedor.nombreProveedor}</td>
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

                    {this.state.proveedores.length < 1 &&
                        <h4>
                            No se encontraron registros
                        </h4>
                    }
                </fieldset>
            </>
        )
    }
}