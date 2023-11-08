import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import "./style.css"
import radiador from './images/radiador.png'

export default class VentaRadiador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaYears: [],
            year: "0",
            idMarca: "0",
            marcas: [],
            autos: [],
            idAuto: "0",
            idProveedor: "0",
            proveedores: [],
            productos: []
        }
    }

    listaYears = async () => {
        try {
            await axios.get(`${g.url_api}/auto/listaYears`)
                .then(res => {
                    this.setState({ listaYears: res.data })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    marcaPorYear = async (year) => {
        try {
            await axios.get(`${g.url_api}/marca/PorYear?year=${year}`)
                .then(res => {
                    this.setState({
                        marcas: res.data,
                        idMarca: "0",
                        idAuto: "0",
                        autos: [],
                        productos: []
                    })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    autoPorMarca = async (idMarca) => {
        let yearMarca = {
            idMarca: idMarca,
            year: this.state.year
        }
        try {
            await axios.post(`${g.url_api}/Auto/modeloPorMarcaYear`, yearMarca)
                .then(res => {
                    this.setState({
                        autos: res.data,
                        idAuto: "0",
                        productos: []
                    })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    componentDidMount() {
        this.listaYears()
        this.marcaPorYear(this.state.year)
    }

    onChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === "year") {
            this.marcaPorYear(e.target.value)
        }
        if (e.target.name === "idMarca") {
            this.autoPorMarca(e.target.value)
        }
    }

    buscarProducto = async () => {
        if (this.state.idMarca === "0" || this.state.year === "0") {
            alert("Error:\nDebe seleccionar al menos el año y la marca del auto.")
            return false
        }
        let fMarcaAuto = {
            year: this.state.year,
            idMarca: this.state.idMarca,
            idAuto: this.state.idAuto
        }
        try {
            await axios.post(`${g.url_api}/Producto/FiltroMarcaAuto`, fMarcaAuto)
                .then(res => {
                    this.setState({ productos: res.data })
                })
        }
        catch (err) {
            alert("Error:\n" + err)
        }
    }

    render() {
        return (
            <>
                VENTA DE RADIADORES

                <fieldset>
                    <legend>Filtro de busqueda</legend>
                    <p>
                        Año: <select
                            name="year"
                            value={this.state.year}
                            onChange={this.onChange}
                        >
                            <option value="0">Selecciona una año</option>
                            {this.state.listaYears.map((year) => {
                                return (
                                    <option value={year} key={year}>{year}</option>
                                )
                            })}
                        </select>

                    </p>
                    <p>
                        Marca: <select
                            name="idMarca"
                            value={this.state.idMarca}
                            onChange={this.onChange}
                        >
                            <option value="0">Selecciona una marca</option>
                            {this.state.marcas.map((marca) => {
                                return (
                                    <option value={marca.idMarca} key={marca.idMarca}>{marca.nombreMarca}</option>
                                )
                            })}
                        </select>
                    </p>
                    <p>
                        Modelo: <select
                            name="idAuto"
                            value={this.state.idAuto}
                            onChange={this.onChange}
                        >
                            <option value="0">Selecciona un auto</option>
                            {this.state.autos.map((auto) => {
                                return (
                                    <option value={auto.idAuto} key={auto.idAuto}>{auto.nombreMarca}, modelo: {auto.modelo}, año: {auto.year}, motor: {auto.motor}</option>
                                )
                            })}
                        </select>
                    </p>

                    <p>
                        <button
                            type="button"
                            onClick={this.buscarProducto}
                        >
                            Buscar productos
                        </button>
                    </p>
                </fieldset>

                <fieldset>
                    <legend>Resultados de la busqueda</legend>

                    {this.state.productos.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>AUTO</th>
                                    <th>PRODUCTO</th>
                                    <th>PRECIOS</th>
                                    <th>OBSERVACIONES</th>
                                    <th>EXISTENCIA</th>
                                    <th>IMAGEN</th>
                                    <th>COTIZACION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productos.map((producto) => {
                                    return (
                                        <tr key={producto.idProducto}>
                                            <td>{producto.nombreMarca} <br />
                                                modelo: {producto.modelo} <br />
                                                año: {producto.year} <br />
                                                motor: {producto.motor} </td>
                                            <td>
                                                proveedor: {producto.nombreProveedor} <br />
                                                {producto.nombreProducto} <br />
                                                # de parte: {producto.noParte} <br />
                                                material: {producto.material} </td>
                                            <td>precioNuevoInstalado: {producto.precioNuevoInstalado} <br />
                                                precioNuevoSuelto: {producto.precioNuevoSuelto} <br />
                                                precioReparadoInstalado: {producto.precioReparadoInstalado} <br />
                                                precioReparadoSuelto: {producto.precioReparadoSuelto} </td>
                                            <td>{producto.observaciones}</td>
                                            <td>{producto.existencia}</td>
                                            <td>
                                                <img src={radiador} alt='Imagen de muestra' />
                                            </td>
                                            <td>
                                                <button>Ver PDF</button><br />
                                                <button>Enviar email</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                    {this.state.productos.length === 0 &&
                        <h4>No se encontraron resultados</h4>
                    }
                </fieldset>
            </>
        )
    }
}