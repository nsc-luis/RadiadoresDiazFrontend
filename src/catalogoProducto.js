import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import "./style.css"

export default class catalogoProducto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: [],
            proveedores: [],
            idProveedor: "0",
            productos: [],
            mostrarFiltroMarca: false,
            marcas: [],
            idMarca: "0",
            productosTemp: []
        }
    }

    componentDidMount() {
        this.listaAutos()
        this.listaProveedores()
    }

    listaAutos = async () => {
        await axios.get(`${g.url_api}/auto`)
            .then(res => {
                this.setState({ autos: res.data })
            })
    }

    listaProveedores = async () => {
        await axios.get(`${g.url_api}/proveedor`)
            .then(res => {
                this.setState({ proveedores: res.data })
            })
    }

    listaProductos = async (idProveedor) => {
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

    onChangeProveedor = (e) => {
        this.setState({
            idProveedor: e.target.value,
            mostrarFiltroMarca: e.target.value !== "0" ? true : false,
            idMarca: "0"
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

    guardarInfo = (e) => {
        e.preventDefault()
        alert("Alerta:\nAun no funcional.")
    }

    render() {
        return (
            <>
                CATALOGO DE PRODUCTOS
                <fieldset>
                    <legend>Formulario de alta/edicion de producto</legend>
                    <form onSubmit={this.guardarInfo}>
                        <p>
                            tipoProducto:
                            <select>
                                <option>Selecciona el tipo de producto</option>
                                <option>Radiador</option>
                                <option>Tapa</option>
                                <option>Ventilador</option>
                                <option>Accesorio</option>
                            </select>
                        </p>
                        <p>
                            nombreProducto: <input type="text" />
                        </p>

                        <p>
                            precioNuevoSuelto: <input type="number" />
                        </p>

                        <p>
                            precioNuevoInstalado: <input type="number" />
                        </p>

                        <p>
                            precioReparadoSuelto: <input type="number" />
                        </p>

                        <p>
                            precioReparadoInstalado: <input type="number" />
                        </p>

                        <p>
                            noParte: <input type="text" />
                        </p>

                        <p>
                            observaciones:<br />
                            <textarea></textarea>
                        </p>

                        <p>
                            Proveedor:
                            <select>
                                <option>Seleccione un proveedor</option>
                                {this.state.proveedores.map((proveedor) => {
                                    return (
                                        <option key={proveedor.idProveedor} value={proveedor.idProveedor}> {proveedor.nombreProveedor}</option>
                                    )
                                })}
                            </select>
                        </p>

                        <p>
                            costoProveedor: <input type="number" />
                        </p>

                        <p>
                            Aplica para el auto:
                            <select>
                                <option>Seleccione un auto</option>
                                {this.state.autos.map((auto) => {
                                    return (
                                        <option key={auto.idAuto} value={auto.idAuto}> {auto.nombreMarca}, año: {auto.year} modelo: {auto.modelo}, motor: {auto.motor}</option>
                                    )
                                })}
                            </select>
                        </p>

                        <p>
                            existencia: <input type="number" />
                        </p>

                        <p>
                            <button type="submit">Guardar</button>
                        </p>
                    </form>
                </fieldset>

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