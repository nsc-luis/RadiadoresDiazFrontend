import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import "./style.css"

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
            formularioProducto: false
        }
    }

    componentDidMount() {
        this.listaAutos()
        this.listaProveedores()
        this.setState({
            infoProducto: {
                ...this.state.infoProducto,
                idProveedor: "0",
                idAuto: "0",
                idTipoProducto: "1",
                nombreProducto: "",
                precioNuevoSuelto: "0.00",
                precioNuevoInstalado: "0.00",
                precioReparadoSuelto: "0.00",
                precioReparadoInstalado: "0.00",
                material: "",
                noParte: "",
                observaciones: "",
                costoProveedor: "",
                existencia: ""
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
            this.listaProductos(this.state.idProveedor)
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
                precioNuevoSuelto: "0.00",
                precioNuevoInstalado: "0.00",
                precioReparadoSuelto: "0.00",
                precioReparadoInstalado: "0.00",
                noParte: "",
                observaciones: "",
                costoProveedor: "0.00",
                existencia: ""
            }
        })
    }

    guardarInfo = async (e) => {
        e.preventDefault()
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
        ) {
            alert("Error:\nLos campos marcados con * son requeridos.")
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
                        <form onSubmit={this.guardarInfo}>
                            <p>
                                * tipoProducto:
                                <select
                                    name="idTipoProducto"
                                    value={this.state.infoProducto.idTipoProducto}
                                    onChange={this.onChange}
                                >
                                    <option value="0">Selecciona el tipo de producto</option>
                                    <option value="1">Radiador</option>
                                    <option value="2">Tapa</option>
                                    <option value="3">Ventilador</option>
                                    <option value="4">Accesorio</option>
                                </select>
                            </p>
                            <p>
                                * nombreProducto:
                                <input
                                    type="text"
                                    name="nombreProducto"
                                    value={this.state.infoProducto.nombreProducto}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * precioNuevoSuelto:
                                <input
                                    type="number"
                                    name="precioNuevoSuelto"
                                    value={this.state.infoProducto.precioNuevoSuelto}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * precioNuevoInstalado:
                                <input
                                    type="number"
                                    name="precioNuevoInstalado"
                                    value={this.state.infoProducto.precioNuevoInstalado}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * precioReparadoSuelto:
                                <input
                                    type="number"
                                    name="precioReparadoSuelto"
                                    value={this.state.infoProducto.precioReparadoSuelto}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * precioReparadoInstalado:
                                <input
                                    type="number"
                                    name="precioReparadoInstalado"
                                    value={this.state.infoProducto.precioReparadoInstalado}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * noParte: <input
                                    type="text"
                                    name="noParte"
                                    value={this.state.infoProducto.noParte}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * material: <input
                                    type="text"
                                    name="material"
                                    value={this.state.infoProducto.material}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * observaciones:<br />
                                <textarea
                                    name="observaciones"
                                    value={this.state.infoProducto.observaciones}
                                    onChange={this.onChange}
                                ></textarea>
                            </p>

                            <p>
                                * Proveedor:
                                <select
                                    name="idProveedor"
                                    value={this.state.infoProducto.idProveedor}
                                    onChange={this.onChange}
                                >
                                    <option>Seleccione un proveedor</option>
                                    {this.state.proveedores.map((proveedor) => {
                                        return (
                                            <option key={proveedor.idProveedor} value={proveedor.idProveedor}> {proveedor.nombreProveedor}</option>
                                        )
                                    })}
                                </select>
                            </p>

                            <p>
                                * costoProveedor:
                                <input type="number"
                                    name="costoProveedor"
                                    value={this.state.infoProducto.costoProveedor}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                * Aplica para el auto:
                                <select
                                    name="idAuto"
                                    value={this.state.infoProducto.idAuto}
                                    onChange={this.onChange}
                                >
                                    <option>Seleccione un auto</option>
                                    {this.state.autos.map((auto) => {
                                        return (
                                            <option key={auto.idAuto} value={auto.idAuto}> {auto.nombreMarca}, año: {auto.year} modelo: {auto.modelo}, motor: {auto.motor}</option>
                                        )
                                    })}
                                </select>
                            </p>

                            <p>
                                * existencia:
                                <input
                                    type="number"
                                    name="existencia"
                                    value={this.state.infoProducto.existencia}
                                    onChange={this.onChange}
                                />
                            </p>

                            <p>
                                <button
                                    type="submit"
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    onClick={this.mostrarFormularioProducto}
                                >
                                    Cerrar
                                </button>
                            </p>
                        </form>
                    </fieldset>
                }

                <fieldset>
                    <legend>Lista de productos</legend>
                    <select
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
                    </select>

                    {this.state.mostrarFiltroMarca &&
                        <>
                            filtro de marca:
                            <select
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
                            </select>
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
                                    return (
                                        <>
                                            <tr key={producto.idProducto}>
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