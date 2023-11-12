import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import styles from './style.css'
import { FormFeedback, Input, FormGroup, Form, Button } from 'reactstrap'

export default class catalogoProducto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idMarca: "0",
            marcas: [],
            autos: [],
            proveedores: [],
            productosTemp: [],
            productos: [],
            infoProducto: {},
            mostrarFiltroMarca: false,
            formularioProducto: false,
            idProveedorInvalid: false,
            nombreProductoInvalid: false,
            precioNuevoSueltoInvalid: false,
            precioNuevoInstaladoInvalid: false,
            precioReparadoSueltoInvalid: false,
            precioReparadoInstaladoInvalid: false,
            costoProveedorInvalid: false,
            existenciaInvalid: false,
            noParteInvalid: false,
            idAutoInvalid: false,
            materialInvalid: false
        }
    }

    componentDidMount() {
        this.listaAutos()
        this.listaProveedores()
        this.listaMarcas()
        this.setState({
            infoProducto: {
                ...this.state.infoProducto,
                idProveedor: "0",
                idAuto: "0",
                idTipoProducto: "1",
                nombreProducto: "",
                precioNuevoSuelto: "0",
                precioNuevoInstalado: "0",
                precioReparadoSuelto: "0",
                precioReparadoInstalado: "0",
                material: "0",
                noParte: "",
                observaciones: "",
                costoProveedor: "0",
                existencia: "0"
            }
        })
    }

    listaAutos = async () => {
        try {
            await axios.get(`${g.url_api}/auto`)
                .then(res => {
                    this.setState({ autos: res.data })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    listaMarcas = async () => {
        try {
            await axios.get(`${g.url_api}/marca`)
                .then(res => {
                    this.setState({
                        marcas: res.data
                    })
                })
        }
        catch (err) {
            alert("Error:\n" + err.message)
        }
    }

    listaProveedores = async () => {
        try {
            await axios.get(`${g.url_api}/proveedor`)
                .then(res => {
                    this.setState({ proveedores: res.data })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    listaProductos = async (idProveedor) => {
        try {
            await axios.get(`${g.url_api}/producto/PorProveedor?idProveedor=${idProveedor}`)
                .then(res => {
                    var marcasTemp = res.data
                    var hash = {}
                    /* marcasTemp = marcasTemp.filter(function(marca){
                        var noRepetidos = !hash[marca.idMarca]
                        hash[marca.idMarca] = true
                        return noRepetidos
                    }) */
                    marcasTemp = marcasTemp.filter(o => hash[o.idMarca] ? false : hash[o.idMarca] = true)
                    this.setState({
                        productos: res.data,
                        marcas: marcasTemp
                    })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    onChange = (e) => {
        this.setState({
            infoProducto: {
                ...this.state.infoProducto,
                [e.target.name]: e.target.value
            }
        })
    }

    onChangeProveedor = (e) => {
        this.setState({
            infoProducto: {
                ...this.state.infoProducto,
                idProveedor: e.target.value,
                idMarca: "0",
            },
            mostrarFiltroMarca: e.target.value !== "0" ? true : false,
        })
        this.listaProductos(e.target.value)
    }

    onChangeMarca = (e) => {
        this.setState({ idMarca: e.target.value })
        if (e.target.value !== "0") {
            var productosTemp = []
            this.state.productos.forEach(prod => {
                if (prod.idMarca === Number(e.target.value)) {
                    productosTemp.push(prod)
                }
            })
            this.setState({ productos: productosTemp })
        }
        else {
            this.listaProductos(this.state.infoProducto.idProveedor)
        }
    }

    mostrarFormularioProducto = () => {
        this.setState({
            formularioProducto: !this.state.formularioProducto,
            infoProducto: {
                ...this.state.infoProducto,
                idProveedor: "0",
                idAuto: "0",
                idTipoProducto: "1",
                nombreProducto: "",
                precioNuevoSuelto: "0",
                precioNuevoInstalado: "0",
                precioReparadoSuelto: "0",
                precioReparadoInstalado: "0",
                noParte: "",
                observaciones: "",
                costoProveedor: "0",
                existencia: "0",
                material: "0"
            },
            idProveedorInvalid: false,
            nombreProductoInvalid: false,
            precioNuevoSueltoInvalid: false,
            precioNuevoInstaladoInvalid: false,
            precioReparadoSueltoInvalid: false,
            precioReparadoInstaladoInvalid: false,
            costoProveedorInvalid: false,
            existenciaInvalid: false,
            noParteInvalid: false,
            idAutoInvalid: false,
            materialInvalid: false
        })
    }

    guardarInfo = async (e) => {
        e.preventDefault()

        this.setState({
            idProveedorInvalid: this.state.infoProducto.idProveedor === "0" ? true : false,
            nombreProductoInvalid: this.state.infoProducto.nombreProducto === "" ? true : false,
            precioNuevoSueltoInvalid: !Number(this.state.infoProducto.precioNuevoSuelto) ? true : false,
            precioNuevoInstaladoInvalid: !Number(this.state.infoProducto.precioNuevoInstalado) ? true : false,
            precioReparadoSueltoInvalid: !Number(this.state.infoProducto.precioReparadoSuelto) ? true : false,
            precioReparadoInstaladoInvalid: !Number(this.state.infoProducto.precioReparadoInstalado) ? true : false,
            costoProveedorInvalid: !Number(this.state.infoProducto.costoProveedor) ? true : false,
            existenciaInvalid: !Number(this.state.infoProducto.existencia) ? true : false,
            noParteInvalid: this.state.infoProducto.noParte === "" ? true : false,
            idAutoInvalid: this.state.infoProducto.idAuto === "0" ? true : false,
            materialInvalid: this.state.infoProducto.material === "0" ? true : false,
        })

        if (
            this.state.infoProducto.idProveedor === "0"
            || this.state.infoProducto.nombreProducto === ""
            || !Number(this.state.infoProducto.precioNuevoSuelto)
            || !Number(this.state.infoProducto.precioNuevoInstalado)
            || !Number(this.state.infoProducto.precioReparadoSuelto)
            || !Number(this.state.infoProducto.precioReparadoInstalado)
            || !Number(this.state.infoProducto.costoProveedor)
            || !Number(this.state.infoProducto.existencia)
            || this.state.infoProducto.noParte === ""
            || this.state.infoProducto.idAuto === "0"
            || this.state.infoProducto.material === "0"
        ) {
            alert("Error:\nLos campos marcados con * son requeridos.")
            return false
        }
        try {
            await axios.post(`${g.url_api}/producto`, this.state.infoProducto)
                .then(res => {
                    alert("Ok!\nAlta de producto satisfactoria.")
                    console.log(res.data)
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
        this.mostrarFormularioProducto()
    }

    render() {
        return (
            <>
                CATALOGO DE PRODUCTOS <br />

                {this.state.formularioProducto === false &&
                    <button
                        type="buton"
                        onClick={this.mostrarFormularioProducto}
                    >
                        Formulario producto
                    </button>
                }

                {this.state.formularioProducto &&
                    <fieldset>
                        <legend>Formulario de alta/edicion de producto</legend>
                        <Form onSubmit={this.guardarInfo}>
                            <FormGroup>
                                * tipoProducto:
                                <Input
                                    type='select'
                                    name="idTipoProducto"
                                    value={this.state.infoProducto.idTipoProducto}
                                >
                                    <option value="0">Selecciona el tipo de producto</option>
                                    <option value="1">Radiador</option>
                                    <option value="2">Tapa</option>
                                    <option value="3">Ventilador</option>
                                    <option value="4">Accesorio</option>
                                </Input>
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                * nombreProducto:
                                <Input
                                    type="text"
                                    name="nombreProducto"
                                    value={this.state.infoProducto.nombreProducto}
                                    onChange={this.onChange}
                                    invalid={this.state.nombreProductoInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * precioNuevoSuelto:
                                <Input
                                    type="number"
                                    name="precioNuevoSuelto"
                                    value={this.state.infoProducto.precioNuevoSuelto}
                                    onChange={this.onChange}
                                    invalid={this.state.precioNuevoSueltoInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * precioNuevoInstalado:
                                <Input
                                    type="number"
                                    name="precioNuevoInstalado"
                                    value={this.state.infoProducto.precioNuevoInstalado}
                                    onChange={this.onChange}
                                    invalid={this.state.precioNuevoInstaladoInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * precioReparadoSuelto:
                                <Input
                                    type="number"
                                    name="precioReparadoSuelto"
                                    value={this.state.infoProducto.precioReparadoSuelto}
                                    onChange={this.onChange}
                                    invalid={this.state.precioReparadoSueltoInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * precioReparadoInstalado:
                                <Input
                                    type="number"
                                    name="precioReparadoInstalado"
                                    value={this.state.infoProducto.precioReparadoInstalado}
                                    onChange={this.onChange}
                                    invalid={this.state.precioReparadoInstaladoInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * noParte:
                                <Input
                                    type="text"
                                    name="noParte"
                                    value={this.state.infoProducto.noParte}
                                    onChange={this.onChange}
                                    invalid={this.state.noParteInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * material:
                                <Input
                                    type="select"
                                    name="material"
                                    value={this.state.infoProducto.material}
                                    onChange={this.onChange}
                                    invalid={this.state.materialInvalid}
                                >
                                    <option value="0">Selecciona el material</option>
                                    <option value="PLASTICO">Plastico</option>
                                    <option value="METAL">Metal</option>
                                </Input>
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * observaciones:<br />
                                <textarea
                                    name="observaciones"
                                    value={this.state.infoProducto.observaciones}
                                    onChange={this.onChange}
                                ></textarea>
                            </FormGroup>

                            <FormGroup>
                                * Proveedor:
                                <Input
                                    type="select"
                                    name="idProveedor"
                                    value={this.state.infoProducto.idProveedor}
                                    onChange={this.onChange}
                                    invalid={this.state.idProveedorInvalid}
                                >
                                    <option>Seleccione un proveedor</option>
                                    {this.state.proveedores.map((proveedor) => {
                                        return (
                                            <option key={proveedor.idProveedor} value={proveedor.idProveedor}> {proveedor.nombreProveedor}</option>
                                        )
                                    })}
                                </Input>
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * costoProveedor:
                                <Input type="number"
                                    name="costoProveedor"
                                    value={this.state.infoProducto.costoProveedor}
                                    onChange={this.onChange}
                                    invalid={this.state.costoProveedorInvalid}
                                />
                            </FormGroup>

                            <FormGroup>
                                * Aplica para el auto:
                                <Input
                                    type="select"
                                    name="idAuto"
                                    value={this.state.infoProducto.idAuto}
                                    onChange={this.onChange}
                                    invalid={this.state.idAutoInvalid}
                                >
                                    <option>Seleccione un auto</option>
                                    {this.state.autos.map((auto) => {
                                        return (
                                            <option key={auto.idAuto} value={auto.idAuto}> {auto.nombreMarca}, año: {auto.year} modelo: {auto.modelo}, motor: {auto.motor}</option>
                                        )
                                    })}
                                </Input>
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                * existencia:
                                <Input
                                    type="number"
                                    name="existencia"
                                    value={this.state.infoProducto.existencia}
                                    onChange={this.onChange}
                                    invalid={this.state.existenciaInvalid}
                                />
                                <FormFeedback>Este campo es requerido</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Button
                                    type="submit"
                                >
                                    Guardar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={this.mostrarFormularioProducto}
                                >
                                    Cerrar
                                </Button>
                            </FormGroup>
                        </Form>
                    </fieldset>
                }

                <fieldset>
                    <legend>Lista de productos</legend>
                    <Input
                        type="select"
                        name="idProveedor"
                        value={this.state.idProveedor}
                        onChange={this.onChangeProveedor}
                    >
                        <option value="0">Selecciona un proveedor</option>
                        {this.state.proveedores.map((proveedor) => {
                            return (
                                <option key={proveedor.idProveedor} value={proveedor.idProveedor}> {proveedor.nombreProveedor}</option>
                            )
                        })}
                    </Input>

                    {this.state.mostrarFiltroMarca &&
                        <>
                            filtro de marca:
                            <Input
                                type="select"
                                name="idMarca"
                                value={this.state.idMarca}
                                onChange={this.onChangeMarca}
                            >
                                <option value="0">Selecciona una marca</option>
                                {this.state.marcas.map((marca) => {
                                    return (
                                        <option key={marca.idMarca} value={marca.idMarca}> {marca.nombreMarca}</option>
                                    )
                                })}
                            </Input>
                        </>
                    }

                    {this.state.productos.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>PROVEEDOR</th>
                                    <th>PRODUCTO</th>
                                    <th>MARCA</th>
                                    <th>AUTO</th>
                                    <th>EXISTENCIA</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productos.map((producto) => {
                                    var idKey = producto.idProducto + "|" + producto.idProveedor
                                    return (
                                        <>
                                            <tr key={idKey}>
                                                <td>{producto.nombreProveedor}</td>
                                                <td>
                                                    {producto.nombreProducto} <br />
                                                    noParte: {producto.noParte} <br />
                                                    material: {producto.material} <br />
                                                    precioNuevoInstalado: {producto.precioNuevoInstalado} <br />
                                                    precioNuevoSuelto: {producto.precioNuevoSuelto} <br />
                                                    precioReparadoInstalado: {producto.precioReparadoInstalado} <br />
                                                    precioReparadoSuelto: {producto.precioReparadoSuelto} <br />
                                                </td>
                                                <td>{producto.nombreMarca}</td>
                                                <td>
                                                    modelo: {producto.modelo} <br />
                                                    year: {producto.year} <br />
                                                    motor: {producto.motor}
                                                </td>
                                                <td>{producto.existencia}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                    >
                                                        Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                    {this.state.productos.length < 1 &&
                        <>
                            No se encontraron resultados.
                        </>
                    }
                </fieldset >
            </>
        )
    }
}