import React, { Component } from 'react'
import axios from 'axios'
import g from './global'
import "./style.css"

export default class catalogoAuto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            years: [],
            marcas: [],
            idMarca: "0",
            autos: []
        }
    }

    listaYears = () => {
        var list = []
        for (let a = 1960; a < 2025; a++) {
            list = [...list, a]
            this.setState({
                years: list
            })
        }
    }

    listaMarcas = async () => {
        await axios.get(`${g.url_api}/marca`)
            .then(res => {
                this.setState({
                    marcas: res.data
                })
            })
    }

    listaAutos = async (idMarca) => {
        await axios.get(`${g.url_api}/Auto/PorMarca?idMarca=${idMarca}`)
            .then(res => {
                this.setState({
                    autos: res.data
                })
            })
    }

    changeMarca = (e) => {
        this.setState({ idMarca: e.target.value })
        this.listaAutos(e.target.value)
    }

    componentDidMount() {
        this.listaYears()
        this.listaMarcas()
    }

    guardarInfo = (e) => {
        e.preventDefault()
        alert("Aletra:\nAun no funcional.")
    }

    render() {
        return (
            <>
                CATALOGO DE AUTOS

                <fieldset>
                    <legend>Formulario de alta/edicion de auto</legend>
                    <form onSubmit={this.guardarInfo}>
                        <p>
                        Año: <select>
                                <option value="0">Selecciona un año</option>
                                {this.state.years.map((year) => {
                                    return (
                                        <option key={year} value={year}>{year}</option>
                                    )
                                })}
                            </select>
                        </p>

                        <p>
                        Marca: <select>
                                <option value="0">Selecciona una marca</option>
                                {this.state.marcas.map((marca) => {
                                    return (
                                        <option key={marca.idMarca} value={marca.idMarca}>{marca.nombreMarca}</option>
                                    )
                                })}
                            </select>
                        </p>

                        <p>
                        Modelo: <input type="text" />
                        </p>

                        <p>
                            Motor: <input type="text" />
                        </p>

                        <p>
                            <button type="submit">
                                Guardar
                            </button>
                        </p>
                    </form>
                </fieldset >

                <fieldset>
                    <legend>Lista de autos</legend>

                    <select
                        name="idMarca"
                        value={this.state.idMarca}
                        onChange={this.changeMarca}
                    >
                        <option value="0">Selecciona una marca</option>
                        {this.state.marcas.map((marca) => {
                            return (
                                <option key={marca.idMarca} value={marca.idMarca}>{marca.nombreMarca}</option>
                            )
                        })}
                    </select>
                    {this.state.autos.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>MARCA</th>
                                    <th>AÑO</th>
                                    <th>MODELO</th>
                                    <th>MOTOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.autos.map((auto) => {
                                    return (
                                        <tr key={auto.idAuto}>
                                            <td>{auto.nombreMarca}</td>
                                            <td>{auto.year}</td>
                                            <td>{auto.modelo}</td>
                                            <td>{auto.motor}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                    {this.state.autos.length < 1 &&
                        <>No se encontraron resultados</>
                    }
                </fieldset>
            </>
        )
    }
}